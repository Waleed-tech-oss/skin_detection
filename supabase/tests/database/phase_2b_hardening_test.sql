-- Phase 2B database and RLS regression tests.
-- Requires pgTAP and basejump-supabase_test_helpers in the local Supabase stack.
-- All fixtures are transaction-scoped and rolled back; this file is never production seed data.

begin;

select plan(40);

select tests.create_supabase_user('phase2b-a@example.test');
select tests.create_supabase_user('phase2b-b@example.test');

select is(
  (select count(*) from public.profiles where id in (
    tests.get_supabase_uid('phase2b-a@example.test'),
    tests.get_supabase_uid('phase2b-b@example.test')
  )),
  2::bigint,
  'signup trigger creates one profile for each auth user'
);

select is(
  (select profile.display_name
   from public.profiles profile
   where profile.id = tests.get_supabase_uid('phase2b-b@example.test')),
  (select auth_user.raw_user_meta_data ->> 'full_name'
   from auth.users auth_user
   where auth_user.id = tests.get_supabase_uid('phase2b-b@example.test')),
  'signup normalizes one consistent Auth/profile display name even when metadata omitted it'
);

update auth.users
set raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{full_name}',
  to_jsonb(repeat('A', 150))
)
where id = tests.get_supabase_uid('phase2b-a@example.test');

select is(
  (select char_length(display_name) from public.profiles
   where id = tests.get_supabase_uid('phase2b-a@example.test')),
  100,
  'long auth display names are safely capped at 100 characters'
);

select is(
  (select char_length(raw_user_meta_data ->> 'full_name') from auth.users
   where id = tests.get_supabase_uid('phase2b-a@example.test')),
  100,
  'future Auth reads use the same normalized 100-character full_name'
);

update auth.users
set raw_user_meta_data = jsonb_set(
  raw_user_meta_data,
  '{full_name}',
  to_jsonb(E'  Alice\n\tDoe  '::text)
)
where id = tests.get_supabase_uid('phase2b-a@example.test');

select is(
  (select display_name from public.profiles
   where id = tests.get_supabase_uid('phase2b-a@example.test')),
  'Alice Doe',
  'control and repeated whitespace is normalized'
);

update public.profiles
set display_name = 'Administrative Override'
where id = tests.get_supabase_uid('phase2b-a@example.test');

update auth.users
set raw_user_meta_data = raw_user_meta_data || '{"timezone":"UTC"}'::jsonb
where id = tests.get_supabase_uid('phase2b-a@example.test');

select is(
  (select display_name from public.profiles
   where id = tests.get_supabase_uid('phase2b-a@example.test')),
  'Administrative Override',
  'unrelated auth metadata updates do not overwrite display_name'
);

update auth.users
set raw_user_meta_data = jsonb_set(raw_user_meta_data, '{full_name}', '"User A"')
where id = tests.get_supabase_uid('phase2b-a@example.test');

select is(
  (select display_name from public.profiles
   where id = tests.get_supabase_uid('phase2b-a@example.test')),
  'User A',
  'an intentional full_name change synchronizes display_name'
);

insert into public.model_versions (id, task, version) values
  ('10000000-0000-0000-0000-000000000001', 'skin_type', 'test-1'),
  ('10000000-0000-0000-0000-000000000002', 'skin_tone', 'test-1'),
  ('10000000-0000-0000-0000-000000000003', 'primary_concern', 'test-1'),
  ('10000000-0000-0000-0000-000000000004', 'concern_signals', 'test-1'),
  ('10000000-0000-0000-0000-000000000005', 'recommendation', 'test-1'),
  ('10000000-0000-0000-0000-000000000006', 'routine', 'test-1');

insert into public.products (
  id, slug, name, category, catalog_status
) values
  ('20000000-0000-0000-0000-000000000001', 'phase2b-verified', 'Phase 2B Verified', 'Cleanser', 'verified'),
  ('20000000-0000-0000-0000-000000000002', 'phase2b-placeholder', 'Phase 2B Placeholder', 'Cleanser', 'placeholder');

insert into public.questionnaires (
  id, user_id, sensitivity_level, budget
) values
  (
    '30000000-0000-0000-0000-000000000001',
    tests.get_supabase_uid('phase2b-a@example.test'),
    'Medium',
    'PKR 2,000-5,000'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    tests.get_supabase_uid('phase2b-b@example.test'),
    'Low',
    'Under PKR 2,000'
  );

insert into public.skin_analyses (id, user_id, status) values
  (
    '40000000-0000-0000-0000-000000000001',
    tests.get_supabase_uid('phase2b-a@example.test'),
    'processing'
  ),
  (
    '40000000-0000-0000-0000-000000000002',
    tests.get_supabase_uid('phase2b-b@example.test'),
    'processing'
  );

insert into public.skin_analysis_signals (
  analysis_id, signal, is_detected, confidence_pct
) values
  ('40000000-0000-0000-0000-000000000001', 'Redness', true, 61),
  ('40000000-0000-0000-0000-000000000001', 'Pigmentation', false, 18);

set constraints all immediate;

select lives_ok(
  $$
    update public.skin_analyses
    set status = 'completed',
        skin_type = 'Oily',
        skin_type_confidence_pct = 91,
        skin_type_model_version_id = '10000000-0000-0000-0000-000000000001',
        skin_tone = 'Mid-Light',
        skin_tone_confidence_pct = 89,
        skin_tone_model_version_id = '10000000-0000-0000-0000-000000000002',
        primary_concern = 'Acne',
        primary_concern_confidence_pct = 93,
        primary_concern_model_version_id = '10000000-0000-0000-0000-000000000003',
        concern_signal_model_version_id = '10000000-0000-0000-0000-000000000004',
        overall_confidence_pct = 90,
        pipeline_version = 'test-pipeline-1',
        completed_at = now()
    where id = '40000000-0000-0000-0000-000000000001'
  $$,
  'analysis completion succeeds when both signal evaluations exist'
);

select throws_ok(
  $$
    insert into public.skin_analyses (
      id, user_id, status,
      skin_type, skin_type_confidence_pct, skin_type_model_version_id,
      skin_tone, skin_tone_confidence_pct, skin_tone_model_version_id,
      primary_concern, primary_concern_confidence_pct, primary_concern_model_version_id,
      concern_signal_model_version_id, overall_confidence_pct,
      pipeline_version, completed_at
    ) values (
      '40000000-0000-0000-0000-000000000003',
      tests.get_supabase_uid('phase2b-a@example.test'),
      'completed',
      'Normal', 80, '10000000-0000-0000-0000-000000000001',
      'Light', 80, '10000000-0000-0000-0000-000000000002',
      'Pores', 80, '10000000-0000-0000-0000-000000000003',
      '10000000-0000-0000-0000-000000000004', 80,
      'test-pipeline-1', now()
    )
  $$,
  '23514',
  'completed analyses require independently evaluated Redness and Pigmentation results',
  'analysis completion fails without both signal evaluations'
);

select throws_ok(
  $$
    delete from public.skin_analysis_signals
    where analysis_id = '40000000-0000-0000-0000-000000000001'
      and signal = 'Redness'
  $$,
  '23514',
  'signal evaluations for a completed analysis are immutable',
  'completed signal evaluations cannot be deleted'
);

-- Restore the schema's default deferred behavior after forcing completion checks above.
-- This permits analysis deletion to cascade through recommendations and routines atomically.
set constraints all deferred;

insert into public.recommendations (
  id, user_id, analysis_id, questionnaire_id, product_id,
  model_version_id, compatibility_score, rank_position, is_best_match
) values
  (
    '50000000-0000-0000-0000-000000000001',
    tests.get_supabase_uid('phase2b-a@example.test'),
    '40000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000005',
    92, 1, true
  ),
  (
    '50000000-0000-0000-0000-000000000002',
    tests.get_supabase_uid('phase2b-b@example.test'),
    '40000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000005',
    82, 1, true
  );

insert into public.recommendation_factors (
  recommendation_id, factor_type, factor_key, explanation
) values
  ('50000000-0000-0000-0000-000000000001', 'skin_type', 'Oily', 'Test-only explanation'),
  ('50000000-0000-0000-0000-000000000002', 'skin_type', 'Normal', 'Test-only explanation');

insert into public.routines (
  id, user_id, analysis_id, model_version_id
) values
  (
    '60000000-0000-0000-0000-000000000001',
    tests.get_supabase_uid('phase2b-a@example.test'),
    '40000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000006'
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    tests.get_supabase_uid('phase2b-b@example.test'),
    '40000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000006'
  );

insert into public.routine_steps (
  id, routine_id, period, step_order, step_name, category,
  product_id, recommendation_id
) values
  (
    '70000000-0000-0000-0000-000000000001',
    '60000000-0000-0000-0000-000000000001',
    'morning', 1, 'Cleanse', 'Cleanser',
    '20000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000001'
  ),
  (
    '70000000-0000-0000-0000-000000000002',
    '60000000-0000-0000-0000-000000000002',
    'morning', 1, 'Cleanse', 'Cleanser',
    '20000000-0000-0000-0000-000000000001',
    '50000000-0000-0000-0000-000000000002'
  );

select throws_ok(
  $$
    update public.recommendations
    set analysis_id = '40000000-0000-0000-0000-000000000002'
    where id = '50000000-0000-0000-0000-000000000001'
  $$,
  '23514',
  'recommendation analysis, product, and model version are immutable',
  'existing recommendation provenance cannot be reassigned'
);

select throws_ok(
  $$
    update public.routines
    set analysis_id = '40000000-0000-0000-0000-000000000002'
    where id = '60000000-0000-0000-0000-000000000001'
  $$,
  '23514',
  'routine analysis and model version are immutable',
  'existing routine provenance cannot be reassigned'
);

select lives_ok(
  $$
    update public.products
    set category = 'Serum'
    where id = '20000000-0000-0000-0000-000000000001'
  $$,
  'catalog category changes cascade consistently to routine steps'
);

select is(
  (select category::text from public.routine_steps
   where id = '70000000-0000-0000-0000-000000000001'),
  'Serum',
  'existing routine-step category remains consistent with its product'
);

select throws_ok(
  $$
    update public.products
    set catalog_status = 'placeholder'
    where id = '20000000-0000-0000-0000-000000000001'
  $$,
  '23514',
  'products referenced by recommendations must remain verified or archived',
  'a referenced catalog product cannot be hidden as a placeholder'
);

select tests.authenticate_as('phase2b-a@example.test');

select is((select count(*) from public.profiles), 1::bigint, 'User A sees only own profile');
select is(
  (select count(*) from public.profiles where id = tests.get_supabase_uid('phase2b-b@example.test')),
  0::bigint,
  'User A cannot read User B profile'
);

select throws_ok(
  $$update public.profiles set display_name = 'Bypass' where id = auth.uid()$$,
  '42501',
  'permission denied for table profiles',
  'browser users cannot bypass Auth metadata to update profile names'
);

select is((select count(*) from public.questionnaires), 1::bigint, 'User A sees only own questionnaire');
select is(
  (select count(*) from public.questionnaires where id = '30000000-0000-0000-0000-000000000002'),
  0::bigint,
  'User A cannot read User B questionnaire'
);

select throws_ok(
  $$
    insert into public.questionnaire_allergies (questionnaire_id, allergen)
    values ('30000000-0000-0000-0000-000000000002', 'Cross-user test')
  $$,
  '42501',
  'new row violates row-level security policy for table "questionnaire_allergies"',
  'User A cannot add child data to User B questionnaire'
);

select is((select count(*) from public.skin_analyses), 1::bigint, 'User A sees only own analyses');
select is(
  (select count(*) from public.skin_analyses where id = '40000000-0000-0000-0000-000000000002'),
  0::bigint,
  'User A cannot read User B analysis'
);
select results_eq(
  $$
    delete from public.skin_analyses
    where id = '40000000-0000-0000-0000-000000000002'
    returning id
  $$,
  $$select null::uuid where false$$,
  'User A cannot delete User B analysis'
);
select is((select count(*) from public.skin_analysis_signals), 2::bigint, 'User A sees only own signal evaluations');
select is((select count(*) from public.recommendations), 1::bigint, 'User A sees only own recommendations');
select is((select count(*) from public.recommendation_factors), 1::bigint, 'User A sees only own recommendation factors');
select is((select count(*) from public.routines), 1::bigint, 'User A sees only own routines');
select is((select count(*) from public.routine_steps), 1::bigint, 'User A sees only own routine steps');
select is((select count(*) from public.products), 1::bigint, 'authenticated users see verified catalog products');
select is(
  (select count(*) from public.products where catalog_status = 'placeholder'),
  0::bigint,
  'placeholder catalog products remain hidden'
);

select throws_ok(
  $$insert into public.products (slug, name, category) values ('forbidden', 'Forbidden', 'Cleanser')$$,
  '42501',
  'permission denied for table products',
  'authenticated users cannot write catalog products'
);
select throws_ok(
  $$select * from public.model_versions$$,
  '42501',
  'permission denied for table model_versions',
  'authenticated users cannot read backend model versions'
);
select throws_ok(
  $$
    insert into public.recommendations (
      user_id, analysis_id, product_id, model_version_id,
      compatibility_score, rank_position
    ) values (
      auth.uid(),
      '40000000-0000-0000-0000-000000000001',
      '20000000-0000-0000-0000-000000000001',
      '10000000-0000-0000-0000-000000000005',
      99, 2
    )
  $$,
  '42501',
  'permission denied for table recommendations',
  'authenticated users cannot fabricate recommendations'
);
select is(
  (select count(*) from public.routines where id = '60000000-0000-0000-0000-000000000002'),
  0::bigint,
  'User A cannot read User B routine by id'
);

select results_eq(
  $$
    delete from public.skin_analyses
    where id = '40000000-0000-0000-0000-000000000001'
    returning id
  $$,
  $$values ('40000000-0000-0000-0000-000000000001'::uuid)$$,
  'User A can delete own completed analysis despite signal immutability'
);
select is(
  (
    (select count(*) from public.skin_analysis_signals) +
    (select count(*) from public.recommendations) +
    (select count(*) from public.recommendation_factors) +
    (select count(*) from public.routines) +
    (select count(*) from public.routine_steps)
  ),
  0::bigint,
  'deleting an owned analysis cascades all owner-visible generated descendants'
);

select tests.authenticate_as('phase2b-b@example.test');
select is((select count(*) from public.profiles), 1::bigint, 'User B sees own profile');
select is(
  (select count(*) from public.profiles where id = tests.get_supabase_uid('phase2b-a@example.test')),
  0::bigint,
  'User B cannot read User A profile'
);

select tests.clear_authentication();
select throws_ok(
  $$select * from public.profiles$$,
  '42501',
  'permission denied for table profiles',
  'anonymous requests cannot read profiles'
);

select * from finish();
rollback;
