-- DermaAI Phase 2B: core PostgreSQL schema
-- Review-only migration. Do not apply to production until reviewed.

create type public.skin_type as enum ('Dry', 'Normal', 'Oily');
create type public.skin_tone as enum ('Light', 'Mid-Light', 'Mid-Dark', 'Dark');
create type public.primary_concern as enum ('Acne', 'Blackheads', 'Dark Spots', 'Pores', 'Wrinkles');
create type public.concern_signal as enum ('Redness', 'Pigmentation');
create type public.detected_concern as enum (
  'Acne', 'Blackheads', 'Dark Spots', 'Pores', 'Wrinkles', 'Redness', 'Pigmentation'
);
create type public.sensitivity_level as enum ('Low', 'Medium', 'High', 'Not Sure');
create type public.budget_range as enum (
  'Under PKR 2,000',
  'PKR 2,000-5,000',
  'PKR 5,000-10,000',
  'PKR 10,000+',
  'No specific budget'
);
create type public.product_category as enum (
  'Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Exfoliant', 'Eye Cream', 'Mask'
);
create type public.catalog_status as enum ('placeholder', 'verified', 'archived');
create type public.analysis_status as enum ('pending', 'processing', 'completed', 'failed');
create type public.questionnaire_preference_type as enum ('preferred', 'current');
create type public.model_task as enum (
  'skin_type', 'skin_tone', 'primary_concern', 'concern_signals', 'recommendation', 'routine'
);
create type public.recommendation_factor_type as enum (
  'skin_type', 'primary_concern', 'signal', 'sensitivity', 'ingredient_restriction', 'budget', 'preference', 'other'
);
create type public.routine_period as enum ('morning', 'evening');
create type public.routine_step_name as enum ('Cleanse', 'Treat', 'Hydrate', 'Protect', 'Moisturize');

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(btrim(display_name)) between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'Read-only application projection keyed by auth.users.id. raw_user_meta_data.full_name is the display-name source of truth; credentials and email remain in auth.users.';

create table public.questionnaires (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.profiles (id) on delete cascade,
  sensitivity_level public.sensitivity_level not null,
  budget public.budget_range not null,
  fragrance_preference text check (fragrance_preference is null or char_length(fragrance_preference) <= 100),
  texture_preference text check (texture_preference is null or char_length(texture_preference) <= 100),
  notes text check (notes is null or char_length(notes) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, user_id)
);

create table public.questionnaire_allergies (
  id uuid primary key default gen_random_uuid(),
  questionnaire_id uuid not null references public.questionnaires (id) on delete cascade,
  allergen text not null check (char_length(btrim(allergen)) between 1 and 150),
  created_at timestamptz not null default now()
);

create unique index questionnaire_allergies_name_key
  on public.questionnaire_allergies (questionnaire_id, lower(btrim(allergen)));

create table public.ingredients (
  id uuid primary key default gen_random_uuid(),
  inci_name text not null check (char_length(btrim(inci_name)) between 1 and 200),
  common_name text check (common_name is null or char_length(common_name) <= 200),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index ingredients_inci_name_key on public.ingredients (lower(btrim(inci_name)));

create table public.questionnaire_ingredient_restrictions (
  id uuid primary key default gen_random_uuid(),
  questionnaire_id uuid not null references public.questionnaires (id) on delete cascade,
  ingredient_id uuid references public.ingredients (id) on delete set null,
  ingredient_name text not null check (char_length(btrim(ingredient_name)) between 1 and 200),
  reason text check (reason is null or char_length(reason) <= 500),
  created_at timestamptz not null default now()
);

create unique index questionnaire_ingredient_restrictions_name_key
  on public.questionnaire_ingredient_restrictions (questionnaire_id, lower(btrim(ingredient_name)));

create table public.questionnaire_product_preferences (
  id uuid primary key default gen_random_uuid(),
  questionnaire_id uuid not null references public.questionnaires (id) on delete cascade,
  preference_type public.questionnaire_preference_type not null,
  product_type text not null check (char_length(btrim(product_type)) between 1 and 100),
  created_at timestamptz not null default now()
);

create unique index questionnaire_product_preferences_type_key
  on public.questionnaire_product_preferences (
    questionnaire_id,
    preference_type,
    lower(btrim(product_type))
  );

create table public.model_versions (
  id uuid primary key default gen_random_uuid(),
  task public.model_task not null,
  version text not null check (char_length(btrim(version)) between 1 and 100),
  artifact_digest text check (artifact_digest is null or char_length(artifact_digest) <= 255),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  retired_at timestamptz,
  unique (task, version),
  check (retired_at is null or retired_at >= created_at)
);

comment on table public.model_versions is
  'Version registry for inference, recommendation, and routine-generation components.';

create unique index model_versions_one_active_per_task
  on public.model_versions (task)
  where is_active;

create table public.model_validation_metrics (
  id uuid primary key default gen_random_uuid(),
  model_version_id uuid not null references public.model_versions (id) on delete cascade,
  dataset_name text not null check (char_length(btrim(dataset_name)) between 1 and 150),
  dataset_version text not null check (char_length(btrim(dataset_version)) between 1 and 100),
  metric_name text not null check (char_length(btrim(metric_name)) between 1 and 100),
  metric_value numeric not null,
  sample_count integer check (sample_count is null or sample_count > 0),
  evaluation_scope jsonb not null default '{}'::jsonb check (jsonb_typeof(evaluation_scope) = 'object'),
  measured_at timestamptz not null default now(),
  unique (model_version_id, dataset_name, dataset_version, metric_name, evaluation_scope)
);

comment on table public.model_validation_metrics is
  'Offline aggregate validation metrics. These are distinct from per-user inference confidence.';

create table public.skin_analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  status public.analysis_status not null default 'pending',
  skin_type public.skin_type,
  skin_type_confidence_pct numeric(5,2) check (skin_type_confidence_pct between 0 and 100),
  skin_type_model_version_id uuid references public.model_versions (id) on delete restrict,
  skin_tone public.skin_tone,
  skin_tone_confidence_pct numeric(5,2) check (skin_tone_confidence_pct between 0 and 100),
  skin_tone_model_version_id uuid references public.model_versions (id) on delete restrict,
  primary_concern public.primary_concern,
  primary_concern_confidence_pct numeric(5,2) check (primary_concern_confidence_pct between 0 and 100),
  primary_concern_model_version_id uuid references public.model_versions (id) on delete restrict,
  concern_signal_model_version_id uuid references public.model_versions (id) on delete restrict,
  overall_confidence_pct numeric(5,2) check (overall_confidence_pct between 0 and 100),
  pipeline_version text check (pipeline_version is null or char_length(pipeline_version) <= 100),
  analysis_summary text,
  source_image_path text check (source_image_path is null or char_length(source_image_path) <= 1024),
  failure_code text check (failure_code is null or char_length(failure_code) <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz,
  unique (id, user_id),
  check (completed_at is null or completed_at >= created_at),
  check (
    status <> 'completed'
    or (
      skin_type is not null
      and skin_type_confidence_pct is not null
      and skin_tone is not null
      and skin_tone_confidence_pct is not null
      and primary_concern is not null
      and primary_concern_confidence_pct is not null
      and skin_type_model_version_id is not null
      and skin_tone_model_version_id is not null
      and primary_concern_model_version_id is not null
      and concern_signal_model_version_id is not null
      and overall_confidence_pct is not null
      and pipeline_version is not null
      and completed_at is not null
      and failure_code is null
    )
  )
);

comment on column public.skin_analyses.source_image_path is
  'Private storage object path only; never a public credential-bearing URL.';

create table public.skin_analysis_signals (
  id uuid primary key default gen_random_uuid(),
  analysis_id uuid not null references public.skin_analyses (id) on delete cascade,
  signal public.concern_signal not null,
  is_detected boolean not null,
  confidence_pct numeric(5,2) not null check (confidence_pct between 0 and 100),
  region text check (region is null or char_length(region) <= 200),
  created_at timestamptz not null default now(),
  unique (analysis_id, signal)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(btrim(name)) between 1 and 200),
  brand text check (brand is null or char_length(brand) <= 150),
  category public.product_category not null,
  description text,
  price_amount numeric(12,2) check (price_amount is null or price_amount >= 0),
  currency_code text not null default 'PKR' check (currency_code ~ '^[A-Z]{3}$'),
  texture text check (texture is null or char_length(texture) <= 100),
  is_fragrance_free boolean,
  suitable_for_sensitive_skin boolean,
  catalog_status public.catalog_status not null default 'placeholder',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (id, category)
);

create unique index products_slug_key on public.products (lower(slug));

create table public.product_ingredients (
  product_id uuid not null references public.products (id) on delete cascade,
  ingredient_id uuid not null references public.ingredients (id) on delete restrict,
  ingredient_order smallint check (ingredient_order is null or ingredient_order > 0),
  is_key_ingredient boolean not null default false,
  concentration_notes text check (concentration_notes is null or char_length(concentration_notes) <= 500),
  primary key (product_id, ingredient_id)
);

create unique index product_ingredients_order_key
  on public.product_ingredients (product_id, ingredient_order)
  where ingredient_order is not null;

create table public.product_skin_type_suitability (
  product_id uuid not null references public.products (id) on delete cascade,
  skin_type public.skin_type not null,
  rationale text check (rationale is null or char_length(rationale) <= 1000),
  primary key (product_id, skin_type)
);

create table public.product_concern_targets (
  product_id uuid not null references public.products (id) on delete cascade,
  concern public.detected_concern not null,
  rationale text check (rationale is null or char_length(rationale) <= 1000),
  primary key (product_id, concern)
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  analysis_id uuid not null,
  questionnaire_id uuid,
  product_id uuid not null references public.products (id) on delete restrict,
  model_version_id uuid not null references public.model_versions (id) on delete restrict,
  compatibility_score numeric(5,2) not null check (compatibility_score between 0 and 100),
  rank_position integer not null check (rank_position > 0),
  is_best_match boolean not null default false,
  generated_at timestamptz not null default now(),
  check (not is_best_match or rank_position = 1),
  foreign key (analysis_id, user_id)
    references public.skin_analyses (id, user_id) on delete cascade,
  foreign key (questionnaire_id, user_id)
    references public.questionnaires (id, user_id) on delete set null (questionnaire_id),
  unique (analysis_id, product_id, model_version_id),
  unique (analysis_id, rank_position),
  unique (id, product_id)
);

create unique index recommendations_one_best_match_per_analysis
  on public.recommendations (analysis_id)
  where is_best_match;

create table public.recommendation_factors (
  id uuid primary key default gen_random_uuid(),
  recommendation_id uuid not null references public.recommendations (id) on delete cascade,
  factor_type public.recommendation_factor_type not null,
  factor_key text not null check (char_length(btrim(factor_key)) between 1 and 150),
  score_contribution numeric(6,2) check (score_contribution between -100 and 100),
  explanation text not null check (char_length(btrim(explanation)) between 1 and 2000),
  evidence jsonb not null default '{}'::jsonb check (jsonb_typeof(evidence) = 'object'),
  display_order smallint not null default 1 check (display_order > 0),
  created_at timestamptz not null default now(),
  unique (recommendation_id, factor_type, factor_key)
);

create table public.routines (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  analysis_id uuid not null,
  model_version_id uuid not null references public.model_versions (id) on delete restrict,
  name text check (name is null or char_length(name) <= 150),
  is_active boolean not null default true,
  generated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (analysis_id, user_id)
    references public.skin_analyses (id, user_id) on delete cascade
);

create unique index routines_one_active_per_analysis
  on public.routines (analysis_id)
  where is_active;

create table public.routine_steps (
  id uuid primary key default gen_random_uuid(),
  routine_id uuid not null references public.routines (id) on delete cascade,
  period public.routine_period not null,
  step_order smallint not null check (step_order > 0),
  step_name public.routine_step_name not null,
  category public.product_category not null,
  product_id uuid references public.products (id) on delete restrict,
  recommendation_id uuid,
  recommendation_reason text check (recommendation_reason is null or char_length(recommendation_reason) <= 2000),
  usage_instructions text check (usage_instructions is null or char_length(usage_instructions) <= 2000),
  created_at timestamptz not null default now(),
  unique (routine_id, period, step_order),
  check (recommendation_id is null or product_id is not null),
  foreign key (recommendation_id, product_id)
    references public.recommendations (id, product_id)
    on delete no action deferrable initially deferred,
  foreign key (product_id, category)
    references public.products (id, category)
    on update cascade on delete restrict
);

create index questionnaires_user_id_idx on public.questionnaires (user_id);
create index questionnaire_allergies_questionnaire_id_idx on public.questionnaire_allergies (questionnaire_id);
create index questionnaire_restrictions_questionnaire_id_idx on public.questionnaire_ingredient_restrictions (questionnaire_id);
create index questionnaire_restrictions_ingredient_id_idx on public.questionnaire_ingredient_restrictions (ingredient_id);
create index questionnaire_preferences_questionnaire_id_idx on public.questionnaire_product_preferences (questionnaire_id);
create index model_validation_metrics_model_version_id_idx on public.model_validation_metrics (model_version_id);
create index skin_analyses_user_created_at_idx on public.skin_analyses (user_id, created_at desc);
create index skin_analyses_user_status_idx on public.skin_analyses (user_id, status);
create index skin_analysis_signals_analysis_id_idx on public.skin_analysis_signals (analysis_id);
create index products_catalog_category_idx on public.products (catalog_status, category);
create index products_brand_idx on public.products (brand);
create index product_ingredients_ingredient_id_idx on public.product_ingredients (ingredient_id);
create index product_skin_type_suitability_skin_type_idx on public.product_skin_type_suitability (skin_type);
create index product_concern_targets_concern_idx on public.product_concern_targets (concern);
create index recommendations_user_generated_at_idx on public.recommendations (user_id, generated_at desc);
create index recommendations_analysis_score_idx on public.recommendations (analysis_id, compatibility_score desc);
create index recommendations_questionnaire_id_idx on public.recommendations (questionnaire_id);
create index recommendations_product_id_idx on public.recommendations (product_id);
create index recommendation_factors_recommendation_order_idx on public.recommendation_factors (recommendation_id, display_order);
create index routines_user_generated_at_idx on public.routines (user_id, generated_at desc);
create index routines_analysis_id_idx on public.routines (analysis_id);
create index routine_steps_routine_period_order_idx on public.routine_steps (routine_id, period, step_order);
create index routine_steps_recommendation_id_idx on public.routine_steps (recommendation_id);
create index routine_steps_product_id_idx on public.routine_steps (product_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.validate_model_task_references()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_table_name = 'skin_analyses' then
    if new.skin_type_model_version_id is not null and not exists (
      select 1 from public.model_versions mv
      where mv.id = new.skin_type_model_version_id and mv.task = 'skin_type'
    ) then
      raise exception 'skin_type_model_version_id must reference a skin_type model version';
    end if;
    if new.skin_tone_model_version_id is not null and not exists (
      select 1 from public.model_versions mv
      where mv.id = new.skin_tone_model_version_id and mv.task = 'skin_tone'
    ) then
      raise exception 'skin_tone_model_version_id must reference a skin_tone model version';
    end if;
    if new.primary_concern_model_version_id is not null and not exists (
      select 1 from public.model_versions mv
      where mv.id = new.primary_concern_model_version_id and mv.task = 'primary_concern'
    ) then
      raise exception 'primary_concern_model_version_id must reference a primary_concern model version';
    end if;
    if new.concern_signal_model_version_id is not null and not exists (
      select 1 from public.model_versions mv
      where mv.id = new.concern_signal_model_version_id and mv.task = 'concern_signals'
    ) then
      raise exception 'concern_signal_model_version_id must reference a concern_signals model version';
    end if;
  elsif tg_table_name = 'recommendations' then
    if not exists (
      select 1 from public.model_versions mv
      where mv.id = new.model_version_id and mv.task = 'recommendation'
    ) then
      raise exception 'model_version_id must reference a recommendation model version';
    end if;
    if not exists (
      select 1 from public.products p
      where p.id = new.product_id and p.catalog_status = 'verified'
    ) then
      raise exception 'recommendations may reference only verified products';
    end if;
  elsif tg_table_name = 'routines' then
    if not exists (
      select 1 from public.model_versions mv
      where mv.id = new.model_version_id and mv.task = 'routine'
    ) then
      raise exception 'model_version_id must reference a routine model version';
    end if;
  end if;
  return new;
end;
$$;

create or replace function public.protect_model_version_identity()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.task is distinct from old.task or new.version is distinct from old.version then
    raise exception 'model version task and version are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.validate_routine_step_relationships()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.product_id is not null and not exists (
    select 1 from public.products p
    where p.id = new.product_id and p.category = new.category
  ) then
    raise exception 'routine step category must match its product category';
  end if;

  if new.recommendation_id is not null and not exists (
    select 1
    from public.routines routine
    join public.recommendations recommendation
      on recommendation.analysis_id = routine.analysis_id
      and recommendation.user_id = routine.user_id
    where routine.id = new.routine_id
      and recommendation.id = new.recommendation_id
      and recommendation.product_id = new.product_id
  ) then
    raise exception 'routine step recommendation must belong to the same user and analysis';
  end if;

  return new;
end;
$$;

create or replace function public.protect_owned_record_identity()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.id is distinct from old.id or new.user_id is distinct from old.user_id then
    raise exception using
      errcode = '23514',
      message = format('%s id and user_id are immutable', tg_table_name);
  end if;
  return new;
end;
$$;

create or replace function public.protect_analysis_completion()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.status = 'completed' and row(
    new.status,
    new.skin_type,
    new.skin_type_confidence_pct,
    new.skin_type_model_version_id,
    new.skin_tone,
    new.skin_tone_confidence_pct,
    new.skin_tone_model_version_id,
    new.primary_concern,
    new.primary_concern_confidence_pct,
    new.primary_concern_model_version_id,
    new.concern_signal_model_version_id,
    new.overall_confidence_pct,
    new.pipeline_version,
    new.completed_at
  ) is distinct from row(
    old.status,
    old.skin_type,
    old.skin_type_confidence_pct,
    old.skin_type_model_version_id,
    old.skin_tone,
    old.skin_tone_confidence_pct,
    old.skin_tone_model_version_id,
    old.primary_concern,
    old.primary_concern_confidence_pct,
    old.primary_concern_model_version_id,
    old.concern_signal_model_version_id,
    old.overall_confidence_pct,
    old.pipeline_version,
    old.completed_at
  ) then
    raise exception using
      errcode = '23514',
      message = 'completed analysis outputs and provenance are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.protect_recommendation_identity()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if row(new.analysis_id, new.product_id, new.model_version_id)
    is distinct from row(old.analysis_id, old.product_id, old.model_version_id) then
    raise exception using
      errcode = '23514',
      message = 'recommendation analysis, product, and model version are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.protect_routine_identity()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if row(new.analysis_id, new.model_version_id)
    is distinct from row(old.analysis_id, old.model_version_id) then
    raise exception using
      errcode = '23514',
      message = 'routine analysis and model version are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.enforce_completed_analysis_signals()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  analysis_ids uuid[];
  analysis_uuid uuid;
  current_status public.analysis_status;
  evaluated_signal_count integer;
begin
  if tg_table_name = 'skin_analyses' then
    analysis_ids := array[new.id];
  elsif tg_op = 'INSERT' then
    analysis_ids := array[new.analysis_id];
  elsif tg_op = 'DELETE' then
    analysis_ids := array[old.analysis_id];
  else
    analysis_ids := array[old.analysis_id, new.analysis_id];
  end if;

  foreach analysis_uuid in array analysis_ids loop
    if analysis_uuid is null then
      continue;
    end if;

    select analysis.status
      into current_status
      from public.skin_analyses analysis
      where analysis.id = analysis_uuid;

    if not found or current_status <> 'completed' then
      continue;
    end if;

    select count(*)
      into evaluated_signal_count
      from public.skin_analysis_signals result
      where result.analysis_id = analysis_uuid;

    if evaluated_signal_count <> 2 then
      raise exception using
        errcode = '23514',
        message = 'completed analyses require independently evaluated Redness and Pigmentation results';
    end if;
  end loop;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create or replace function public.protect_completed_analysis_signal()
returns trigger
language plpgsql
set search_path = ''
as $$
declare
  parent_status public.analysis_status;
begin
  select analysis.status
    into parent_status
    from public.skin_analyses analysis
    where analysis.id = old.analysis_id;

  if found and parent_status = 'completed' then
    raise exception using
      errcode = '23514',
      message = 'signal evaluations for a completed analysis are immutable';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create or replace function public.protect_routine_step_identity()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if row(new.id, new.routine_id, new.product_id, new.recommendation_id)
    is distinct from row(old.id, old.routine_id, old.product_id, old.recommendation_id) then
    raise exception using
      errcode = '23514',
      message = 'routine step ownership and product provenance are immutable';
  end if;
  return new;
end;
$$;

create or replace function public.protect_referenced_product_publication()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.catalog_status = 'placeholder'
    and old.catalog_status is distinct from new.catalog_status
    and exists (
      select 1
      from public.recommendations recommendation
      where recommendation.product_id = old.id
    ) then
    raise exception using
      errcode = '23514',
      message = 'products referenced by recommendations must remain verified or archived';
  end if;
  return new;
end;
$$;

create or replace function public.normalize_profile_display_name(
  metadata jsonb,
  auth_email text
)
returns text
language plpgsql
immutable
set search_path = ''
as $$
declare
  candidate text;
begin
  candidate := coalesce(
    nullif(btrim(coalesce(metadata, '{}'::jsonb) ->> 'full_name'), ''),
    nullif(btrim(coalesce(metadata, '{}'::jsonb) ->> 'name'), ''),
    nullif(btrim(split_part(coalesce(auth_email, ''), '@', 1)), ''),
    'DermaAI User'
  );

  candidate := btrim(regexp_replace(candidate, '[[:cntrl:][:space:]]+', ' ', 'g'));
  if candidate = '' then
    candidate := 'DermaAI User';
  end if;

  return btrim(left(candidate, 100));
end;
$$;

create or replace function public.normalize_auth_user_full_name()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE' and (old.raw_user_meta_data ->> 'full_name')
    is not distinct from (new.raw_user_meta_data ->> 'full_name') then
    return new;
  end if;

  new.raw_user_meta_data := jsonb_set(
    coalesce(new.raw_user_meta_data, '{}'::jsonb),
    '{full_name}',
    to_jsonb(public.normalize_profile_display_name(new.raw_user_meta_data, new.email)),
    true
  );
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger questionnaires_set_updated_at
before update on public.questionnaires
for each row execute function public.set_updated_at();

create trigger ingredients_set_updated_at
before update on public.ingredients
for each row execute function public.set_updated_at();

create trigger skin_analyses_set_updated_at
before update on public.skin_analyses
for each row execute function public.set_updated_at();

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create trigger routines_set_updated_at
before update on public.routines
for each row execute function public.set_updated_at();

create trigger skin_analyses_validate_model_tasks
before insert or update of
  skin_type_model_version_id,
  skin_tone_model_version_id,
  primary_concern_model_version_id,
  concern_signal_model_version_id
on public.skin_analyses
for each row execute function public.validate_model_task_references();

create trigger recommendations_validate_model_task
before insert or update of model_version_id, product_id on public.recommendations
for each row execute function public.validate_model_task_references();

create trigger routines_validate_model_task
before insert or update of model_version_id on public.routines
for each row execute function public.validate_model_task_references();

create trigger model_versions_protect_identity
before update of task, version on public.model_versions
for each row execute function public.protect_model_version_identity();

create trigger routine_steps_validate_relationships
before insert or update of routine_id, category, product_id, recommendation_id
on public.routine_steps
for each row execute function public.validate_routine_step_relationships();

create trigger questionnaires_protect_identity
before update of id, user_id on public.questionnaires
for each row execute function public.protect_owned_record_identity();

create trigger skin_analyses_protect_identity
before update of id, user_id on public.skin_analyses
for each row execute function public.protect_owned_record_identity();

create trigger skin_analyses_protect_completed_outputs
before update on public.skin_analyses
for each row execute function public.protect_analysis_completion();

create trigger recommendations_protect_identity
before update of id, user_id, analysis_id, product_id, model_version_id on public.recommendations
for each row execute function public.protect_owned_record_identity();

create trigger recommendations_protect_provenance
before update of analysis_id, product_id, model_version_id on public.recommendations
for each row execute function public.protect_recommendation_identity();

create trigger routines_protect_identity
before update of id, user_id, analysis_id, model_version_id on public.routines
for each row execute function public.protect_owned_record_identity();

create trigger routines_protect_provenance
before update of analysis_id, model_version_id on public.routines
for each row execute function public.protect_routine_identity();

create constraint trigger skin_analyses_require_signal_evaluations
after insert or update on public.skin_analyses
deferrable initially deferred
for each row execute function public.enforce_completed_analysis_signals();

create constraint trigger skin_analysis_signals_preserve_complete_set
after insert or update or delete on public.skin_analysis_signals
deferrable initially deferred
for each row execute function public.enforce_completed_analysis_signals();

create trigger skin_analysis_signals_protect_completed_results
before update or delete on public.skin_analysis_signals
for each row execute function public.protect_completed_analysis_signal();

create trigger routine_steps_protect_identity
before update of id, routine_id, product_id, recommendation_id on public.routine_steps
for each row execute function public.protect_routine_step_identity();

create trigger products_protect_referenced_publication
before update of catalog_status on public.products
for each row execute function public.protect_referenced_product_publication();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, created_at, updated_at)
  values (
    new.id,
    public.normalize_profile_display_name(new.raw_user_meta_data, new.email),
    new.created_at,
    now()
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace function public.sync_auth_user_profile_name()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, created_at, updated_at)
  values (
    new.id,
    public.normalize_profile_display_name(new.raw_user_meta_data, new.email),
    new.created_at,
    now()
  )
  on conflict (id) do update
  set display_name = excluded.display_name,
      updated_at = now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated;
revoke all on function public.validate_model_task_references() from public, anon, authenticated;
revoke all on function public.protect_model_version_identity() from public, anon, authenticated;
revoke all on function public.validate_routine_step_relationships() from public, anon, authenticated;
revoke all on function public.protect_owned_record_identity() from public, anon, authenticated;
revoke all on function public.protect_analysis_completion() from public, anon, authenticated;
revoke all on function public.protect_recommendation_identity() from public, anon, authenticated;
revoke all on function public.protect_routine_identity() from public, anon, authenticated;
revoke all on function public.enforce_completed_analysis_signals() from public, anon, authenticated;
revoke all on function public.protect_completed_analysis_signal() from public, anon, authenticated;
revoke all on function public.protect_routine_step_identity() from public, anon, authenticated;
revoke all on function public.protect_referenced_product_publication() from public, anon, authenticated;
revoke all on function public.normalize_profile_display_name(jsonb, text) from public, anon, authenticated;
revoke all on function public.normalize_auth_user_full_name() from public, anon, authenticated;
revoke all on function public.handle_new_auth_user() from public, anon, authenticated;
revoke all on function public.sync_auth_user_profile_name() from public, anon, authenticated;

insert into public.profiles (id, display_name, created_at, updated_at)
select
  users.id,
  public.normalize_profile_display_name(users.raw_user_meta_data, users.email),
  users.created_at,
  now()
from auth.users as users
on conflict (id) do nothing;

create trigger dermaai_normalize_auth_full_name
before insert or update of raw_user_meta_data on auth.users
for each row execute function public.normalize_auth_user_full_name();

create trigger dermaai_create_profile_after_signup
after insert on auth.users
for each row execute function public.handle_new_auth_user();

create trigger dermaai_sync_profile_after_user_metadata_update
after update of raw_user_meta_data on auth.users
for each row
when (
  (old.raw_user_meta_data ->> 'full_name')
  is distinct from
  (new.raw_user_meta_data ->> 'full_name')
)
execute function public.sync_auth_user_profile_name();

