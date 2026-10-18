-- DermaAI Phase 2B: privileges and Row Level Security
-- Service-role/backend operations bypass RLS. Browser users receive only the grants below.

alter table public.profiles enable row level security;
alter table public.questionnaires enable row level security;
alter table public.questionnaire_allergies enable row level security;
alter table public.questionnaire_ingredient_restrictions enable row level security;
alter table public.questionnaire_product_preferences enable row level security;
alter table public.ingredients enable row level security;
alter table public.model_versions enable row level security;
alter table public.model_validation_metrics enable row level security;
alter table public.skin_analyses enable row level security;
alter table public.skin_analysis_signals enable row level security;
alter table public.products enable row level security;
alter table public.product_ingredients enable row level security;
alter table public.product_skin_type_suitability enable row level security;
alter table public.product_concern_targets enable row level security;
alter table public.recommendations enable row level security;
alter table public.recommendation_factors enable row level security;
alter table public.routines enable row level security;
alter table public.routine_steps enable row level security;

alter table public.profiles force row level security;
alter table public.questionnaires force row level security;
alter table public.questionnaire_allergies force row level security;
alter table public.questionnaire_ingredient_restrictions force row level security;
alter table public.questionnaire_product_preferences force row level security;
alter table public.skin_analyses force row level security;
alter table public.skin_analysis_signals force row level security;
alter table public.recommendations force row level security;
alter table public.recommendation_factors force row level security;
alter table public.routines force row level security;
alter table public.routine_steps force row level security;

revoke all on table
  public.profiles,
  public.questionnaires,
  public.questionnaire_allergies,
  public.questionnaire_ingredient_restrictions,
  public.questionnaire_product_preferences,
  public.ingredients,
  public.model_versions,
  public.model_validation_metrics,
  public.skin_analyses,
  public.skin_analysis_signals,
  public.products,
  public.product_ingredients,
  public.product_skin_type_suitability,
  public.product_concern_targets,
  public.recommendations,
  public.recommendation_factors,
  public.routines,
  public.routine_steps
from anon, authenticated;

grant select on public.profiles to authenticated;
grant select, delete on public.questionnaires to authenticated;
grant insert (user_id, sensitivity_level, budget, fragrance_preference, texture_preference, notes)
  on public.questionnaires to authenticated;
grant update (sensitivity_level, budget, fragrance_preference, texture_preference, notes)
  on public.questionnaires to authenticated;
grant select, delete on public.questionnaire_allergies to authenticated;
grant insert (questionnaire_id, allergen) on public.questionnaire_allergies to authenticated;
grant update (allergen) on public.questionnaire_allergies to authenticated;
grant select, delete on public.questionnaire_ingredient_restrictions to authenticated;
grant insert (questionnaire_id, ingredient_id, ingredient_name, reason)
  on public.questionnaire_ingredient_restrictions to authenticated;
grant update (ingredient_id, ingredient_name, reason)
  on public.questionnaire_ingredient_restrictions to authenticated;
grant select, delete on public.questionnaire_product_preferences to authenticated;
grant insert (questionnaire_id, preference_type, product_type)
  on public.questionnaire_product_preferences to authenticated;
grant update (preference_type, product_type)
  on public.questionnaire_product_preferences to authenticated;
grant select on public.ingredients to authenticated;
grant select, delete on public.skin_analyses to authenticated;
grant select on public.skin_analysis_signals to authenticated;
grant select on public.products to authenticated;
grant select on public.product_ingredients to authenticated;
grant select on public.product_skin_type_suitability to authenticated;
grant select on public.product_concern_targets to authenticated;
grant select on public.recommendations to authenticated;
grant select on public.recommendation_factors to authenticated;
grant select on public.routines to authenticated;
grant select on public.routine_steps to authenticated;

create policy "profiles_select_own"
on public.profiles for select to authenticated
using ((select auth.uid()) = id);

create policy "questionnaires_select_own"
on public.questionnaires for select to authenticated
using ((select auth.uid()) = user_id);

create policy "questionnaires_insert_own"
on public.questionnaires for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "questionnaires_update_own"
on public.questionnaires for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "questionnaires_delete_own"
on public.questionnaires for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "questionnaire_allergies_select_own"
on public.questionnaire_allergies for select to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_allergies_insert_own"
on public.questionnaire_allergies for insert to authenticated
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_allergies_update_own"
on public.questionnaire_allergies for update to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_allergies_delete_own"
on public.questionnaire_allergies for delete to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_restrictions_select_own"
on public.questionnaire_ingredient_restrictions for select to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_restrictions_insert_own"
on public.questionnaire_ingredient_restrictions for insert to authenticated
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_restrictions_update_own"
on public.questionnaire_ingredient_restrictions for update to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_restrictions_delete_own"
on public.questionnaire_ingredient_restrictions for delete to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_preferences_select_own"
on public.questionnaire_product_preferences for select to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_preferences_insert_own"
on public.questionnaire_product_preferences for insert to authenticated
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_preferences_update_own"
on public.questionnaire_product_preferences for update to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
)
with check (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "questionnaire_preferences_delete_own"
on public.questionnaire_product_preferences for delete to authenticated
using (
  exists (
    select 1 from public.questionnaires q
    where q.id = questionnaire_id and q.user_id = (select auth.uid())
  )
);

create policy "skin_analyses_select_own"
on public.skin_analyses for select to authenticated
using ((select auth.uid()) = user_id);

create policy "skin_analyses_delete_own"
on public.skin_analyses for delete to authenticated
using ((select auth.uid()) = user_id);

create policy "skin_analysis_signals_select_own"
on public.skin_analysis_signals for select to authenticated
using (
  exists (
    select 1 from public.skin_analyses a
    where a.id = analysis_id and a.user_id = (select auth.uid())
  )
);

create policy "products_read_published_catalog"
on public.products for select to authenticated
using (catalog_status in ('verified', 'archived'));

create policy "product_ingredients_read_published_catalog"
on public.product_ingredients for select to authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.catalog_status in ('verified', 'archived')
  )
);

create policy "ingredients_read_published_catalog"
on public.ingredients for select to authenticated
using (
  exists (
    select 1
    from public.product_ingredients pi
    join public.products p on p.id = pi.product_id
    where pi.ingredient_id = ingredients.id
      and p.catalog_status in ('verified', 'archived')
  )
);

create policy "product_skin_types_read_published_catalog"
on public.product_skin_type_suitability for select to authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.catalog_status in ('verified', 'archived')
  )
);

create policy "product_concerns_read_published_catalog"
on public.product_concern_targets for select to authenticated
using (
  exists (
    select 1 from public.products p
    where p.id = product_id and p.catalog_status in ('verified', 'archived')
  )
);

create policy "recommendations_select_own"
on public.recommendations for select to authenticated
using ((select auth.uid()) = user_id);

create policy "recommendation_factors_select_own"
on public.recommendation_factors for select to authenticated
using (
  exists (
    select 1 from public.recommendations r
    where r.id = recommendation_id and r.user_id = (select auth.uid())
  )
);

create policy "routines_select_own"
on public.routines for select to authenticated
using ((select auth.uid()) = user_id);

create policy "routine_steps_select_own"
on public.routine_steps for select to authenticated
using (
  exists (
    select 1 from public.routines r
    where r.id = routine_id and r.user_id = (select auth.uid())
  )
);

comment on table public.model_validation_metrics is
  'No anon/authenticated grants or policies: accessible only to trusted backend roles.';

