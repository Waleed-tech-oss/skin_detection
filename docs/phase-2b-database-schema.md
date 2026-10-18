# Phase 2B — Supabase PostgreSQL Schema

This phase contains review-only SQL. The migrations have **not** been applied to any Supabase project.

## Migration files

1. `supabase/migrations/20261013000100_phase_2b_core_schema.sql`
   creates enums, tables, constraints, indexes, timestamps, profile automation, and the existing-user profile backfill.
2. `supabase/migrations/20261013000200_phase_2b_rls.sql`
   applies grants, Row Level Security, and ownership/catalog policies.

Run them in timestamp order. The RLS migration intentionally depends on every table from the core migration.

## Hardening review corrections

- Audited all 18 tables, 30 foreign-key reference clauses, 26 triggers, function privileges, table grants, and the original 30 RLS policies.
- Replaced dual profile-name ownership with one explicit path: Auth `full_name` is canonical and `profiles.display_name` is its read-only projection. The former `profiles_update_own` policy and `display_name` update grant were removed, leaving 29 intentionally scoped policies.
- Restricted Auth-to-profile synchronization to an actual `full_name` change and normalized intended changes before Auth stores them. Unrelated metadata updates no longer overwrite the projection.
- Added deferred completion validation for both Redness and Pigmentation, plus immutability after completion without blocking atomic multi-step inference writes.
- Made generated ownership/provenance keys immutable, cascaded product category changes to routine steps, and prevented a recommended product from being hidden by changing it to `placeholder`.
- Revoked direct execution of every migration-defined function from `public`, `anon`, and `authenticated`; trigger execution remains internal.
- Added a rollback-only pgTAP regression suite for signup reliability, completion invariants, relationship updates/deletes, catalog permissions, and two-user/anonymous isolation.

## Main design decisions

- `profiles.id` is the same UUID as `auth.users.id`. No password, access token, email, or other authentication credential is copied into `public` tables.
- Phase 2A's `auth.users.raw_user_meta_data.full_name` is the display-name source of truth. `profiles.display_name` is a browser-read-only projection: signup creates it, and it synchronizes only when `full_name` itself changes. Unrelated metadata updates cannot overwrite it.
- New or intentionally changed Auth `full_name` values are normalized before storage, and profile names use the same normalizer: control and repeated whitespace is collapsed, blank values use a safe fallback, and values are capped at 100 characters. This preserves the table constraint without allowing malformed metadata to break signup or causing Auth/profile reads to diverge. The migration also backfills existing profiles through the same normalizer.
- The current questionnaire is one-to-one with a user. Allergies, ingredient restrictions, and preferred/current product types use child tables rather than arrays, while preserving free-form labels from the current UI.
- Product restrictions may optionally reference a normalized catalog ingredient while retaining the user-provided ingredient name. This prevents catalog cleanup from erasing the user's stated exclusion.
- Confidence values use explicit `*_confidence_pct` columns constrained to `0–100`, matching current TypeScript fixtures.
- Offline model validation lives in `model_validation_metrics`. Per-user inference confidence lives only on analyses/signals, preventing aggregate validation results from being confused with an individual's output.
- `model_versions` covers each inference task plus recommendation and routine generation. Analyses retain component version foreign keys and a pipeline version.
- The single-label primary concern is stored directly on `skin_analyses`. Redness and Pigmentation are separate rows in `skin_analysis_signals`, allowing both signals to be evaluated independently.
- Analysis rows support `pending`, `processing`, `completed`, and `failed`; completed rows must contain all required outputs, provenance, timestamps, and exactly one independently evaluated row for each of Redness and Pigmentation. `is_detected = false` records a valid negative evaluation.
- Signal completeness uses deferred constraint triggers. A trusted writer can insert the analysis and signal rows in any order in one transaction, but commit fails if a completed analysis lacks either signal. Completed inference outputs and signal evaluations are immutable.
- The source image column stores a private object path, not a public URL. No storage bucket is created in this phase.
- Products, ingredients, product-ingredient links, skin-type suitability, and concern targets are normalized catalog records.
- Recommendations bind the same owner across analysis and questionnaire through composite foreign keys. Only verified products can be recommended; ranked products store an overall score, generator version, and normalized explainability factors.
- Routines are versioned generated records tied to an analysis. Steps have ordered AM/PM positions and may reference the exact recommendation/product that justified the step. Analysis, recommendation, routine, and routine-step ownership/provenance keys are immutable, product category changes cascade to existing routine steps, and a product with recommendation history cannot be demoted to hidden `placeholder` status. It may be archived so historical records remain renderable.
- Deleting an owned analysis cascades its signals, recommendations, factors, routines, and steps. Products and model versions use restrictive deletion to protect historical provenance.

## TypeScript mapping notes

| TypeScript field | Database source |
| --- | --- |
| `UserProfile.id/name/createdAt` | `profiles.id/display_name/created_at` |
| `UserProfile.email` | Continue reading from authenticated `auth.users` through Supabase Auth; it is not duplicated in `profiles` |
| `QuestionnaireProfile.sensitivityLevel/budget` | `questionnaires.sensitivity_level/budget` |
| `allergies` | `questionnaire_allergies.allergen` |
| `ingredientsToAvoid` | `questionnaire_ingredient_restrictions.ingredient_name` |
| `preferredProductTypes/currentRoutine` | `questionnaire_product_preferences`, separated by `preference_type` |
| `SkinAnalysis.skinType/skinTone/primaryConcern` | Same concepts on `skin_analyses` |
| `skinTypeConfidence`, `skinToneConfidence`, `primaryConcernConfidence`, `aiConfidence` | Corresponding percentage columns on `skin_analyses` |
| Redness/Pigmentation `detectedConcerns` | Detected rows from `skin_analysis_signals`; primary concern comes from `skin_analyses` |
| Product `keyIngredients` | `product_ingredients.is_key_ingredient = true` joined to `ingredients` |
| Product `suitableForSkinTypes/targetConcerns` | Suitability and concern junction tables |
| Recommendation `compatibilityScore/rationale/preferencesConsidered` | `recommendations.compatibility_score` plus ordered `recommendation_factors` |
| Routine `morning/evening` | `routine_steps` grouped by `period`, ordered by `step_order` |

Database rows use snake_case, so future data adapters should perform explicit mapping rather than changing the current frontend interfaces.

The current questionnaire page uses UI labels that differ slightly from the typed contract. A future adapter should normalize `Often → High`, `Sometimes → Medium`, `Rarely → Low`, and preserve `Not Sure`. It should also normalize the UI's en-dash budget labels (for example `PKR 2,000–5,000`) to the hyphenated `BudgetRange` values. This phase does not change that UI.

## RLS and privilege model

- Anonymous users receive no access to Phase 2B tables.
- Authenticated users can read only their own profile projection. Name changes must continue through Phase 2A `auth.updateUser({ data: { full_name } })`; direct profile updates are not granted.
- Authenticated users can create, read, update, and delete only their own questionnaire and questionnaire child records.
- Authenticated users can read and delete their own analyses. They cannot manufacture or alter AI outputs.
- Analysis signals, recommendations, recommendation factors, routines, and steps are read-only to their owner. Trusted backend/service-role jobs will create them in later phases.
- Authenticated users can read verified or archived product catalog records and their relationships. They receive no catalog write privileges. Placeholder catalog rows remain hidden.
- `model_versions` and `model_validation_metrics` have RLS enabled but no browser grants or policies. They are backend-only.
- A service-role client bypasses RLS. It must never be used in browser code and is outside this phase.

## Apply after approval

### Supabase SQL Editor

1. Back up the target project and use a non-production project first.
2. Open **SQL Editor** in the Supabase dashboard.
3. Paste and run `20261013000100_phase_2b_core_schema.sql`.
4. Confirm the tables, constraints, indexes, profile backfill, and both `dermaai_*profile*` Auth triggers.
5. Paste and run `20261013000200_phase_2b_rls.sql`.
6. Confirm RLS is enabled and run the tests below before production deployment.

The SQL Editor does not record local migration history automatically. CLI deployment is preferred. If the SQL Editor is used, keep these exact files as the authoritative migration history and, before a later `db push`, link the CLI and mark both versions as already applied:

```powershell
supabase migration repair --status applied 20261013000100
supabase migration repair --status applied 20261013000200
```

Only run `migration repair` after confirming the corresponding SQL completed successfully; otherwise migration history would claim changes that are not present.

### Supabase CLI

From the repository root, after installing the Supabase CLI through an approved method:

```powershell
supabase init
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push --dry-run
supabase db push
```

Do not place a database password, service-role key, or project credential in a committed file. Prefer the CLI's interactive/secure credential handling. Run against a development project before production.

## RLS test plan

An executable pgTAP suite is provided at `supabase/tests/database/phase_2b_hardening_test.sql`. It creates transaction-scoped users and domain fixtures and always rolls them back; it is not production seed data. The alphabetically earlier `supabase/tests/database/000_setup_helpers.sql` follows Supabase's advanced pgTAP testing guide to configure dbdev, install `basejump-supabase_test_helpers` 0.0.6, and verify the installed version and helper function. The alphabetically last `supabase/tests/database/zzz_cleanup_helpers.sql` then removes the helper and dbdev extensions and their pg_tle packages, without `CASCADE`, before the Supabase CLI disables its pgTAP extension. These dependencies remain local test infrastructure and are not production migrations.

The explicit teardown order is required because PostgreSQL records `basejump-supabase_test_helpers` as a normal dependency of `pgtap`. Leaving the helper extension installed causes the CLI's final non-cascading pgTAP removal to fail even when every assertion passes.

After starting the local stack, run the entire directory so the setup hook executes first:

```powershell
npm exec -- supabase db reset
npm exec -- supabase test db supabase/tests/database
```

The setup hook has one assertion, the hardening suite has 40 assertions, and the cleanup hook uses a zero-test plan, preserving 41 total assertions. The hardening suite covers signup/profile creation, long-name normalization, unrelated metadata updates, intentional name synchronization, completed-analysis signal enforcement, generated-record provenance, product/routine consistency, completed-analysis deletion cascades, two-user isolation, catalog write denial, backend model-table denial, fabricated recommendation denial, and anonymous denial.

Create two disposable confirmed users, User A and User B, through normal Supabase Auth. Let each user create their own questionnaire. Use a trusted backend context only to create one completed analysis, recommendation, factor, routine, and routine step for each user. Do not add this test data to migrations.

Test with the user's JWT through the application/Supabase client, or simulate claims inside a transaction in SQL Editor:

```sql
begin;
set local role authenticated;
set local request.jwt.claims = '{"sub":"USER_A_UUID","role":"authenticated"}';
-- Run one test statement at a time here.
rollback;
```

Required assertions:

1. User A can select User A's profile, but selecting User B's profile returns zero rows. Direct profile updates fail; an intentional Phase 2A `full_name` update synchronizes the projection.
2. User A can insert/update/delete a questionnaire with `user_id = USER_A_UUID`. Inserting or reassigning one to User B fails its `WITH CHECK` policy.
3. User A can manage allergy, restriction, and preference rows only beneath User A's questionnaire. Supplying User B's questionnaire ID must fail.
4. User A can list and delete User A's analyses. User B's analysis is invisible and cannot be deleted.
5. User A sees signals, recommendations, factors, routines, and steps only for User A. Direct insert/update attempts fail because privileges were not granted.
6. Both authenticated users can read verified/archived catalog rows. Placeholder rows are invisible.
7. Authenticated attempts to insert, update, or delete products, ingredients, or catalog junction rows fail.
8. Authenticated reads of `model_versions` and `model_validation_metrics` fail for lack of privileges/policies.
9. An anonymous request cannot read profiles, questionnaires, analyses, catalog data, recommendations, or routines.
10. Deleting User A's analysis removes its dependent signals, recommendations/factors, and routines/steps but leaves product and model-version records intact.
11. Deleting the disposable Auth user cascades all of that user's private application records through `profiles`.
12. Repeat tests through the Supabase JavaScript client to verify PostgREST behavior, not only SQL simulation.

### Transactional analysis completion

The future trusted inference writer must complete an analysis atomically:

```sql
begin;
-- Insert or update the analysis while status is pending/processing.
-- Upsert one Redness row and one Pigmentation row, including negative evaluations.
-- Populate all output/model-version fields and set status = 'completed'.
commit;
```

The deferred constraints inspect the final transaction state. Separate API requests are not atomic; the request that changes the status to `completed` will fail unless both signal rows already exist.

## Items to review before applying

- Confirm whether regular users should be permitted to delete analysis history. The current frontend service contract supports deletion, so the migration permits deleting owned analyses.
- Confirm whether archived products should remain readable. They are currently readable to preserve historical recommendation/routine rendering; placeholder products are hidden.
- Confirm whether questionnaire history is required later. Phase 2B models one current questionnaire per user, matching the current interface.
- Decide the eventual private image-retention policy before creating a storage bucket in a later phase.
- Decide which trusted backend component will own writes for model versions, analyses, recommendations, and routines. No browser write policy is provided for generated data.
- The complete local suite passed on 2026-10-18 with `basejump-supabase_test_helpers` 0.0.6: 2 files and 41 total assertions. Repeat it after migration changes and before staging.
- Existing Auth users whose pre-migration `full_name` is longer than 100 characters keep that legacy metadata value until it is intentionally changed; their backfilled profile projection is safely capped. A one-time Auth metadata rewrite was deliberately avoided because it could trigger unrelated Auth integrations.
- The Auth trigger sanitizes names for storage, but product policy, password policy, and broader content moderation remain application concerns.

