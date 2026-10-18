-- Local-test teardown. This runs after all pgTAP assertions and before the
-- Supabase CLI disables the pgTAP extension it owns for the test run.

-- A zero-test plan makes this file a valid skipped TAP file without adding to
-- the suite's 41 assertions. Calling finish() for plan(0) raises by design.
select plan(0);

-- Remove dependent extensions explicitly and in dependency order. Do not use
-- CASCADE: an unexpected dependency should fail cleanup and remain visible.
drop extension if exists "basejump-supabase_test_helpers";
select pgtle.uninstall_extension_if_exists('basejump-supabase_test_helpers');

drop extension if exists "supabase-dbdev";
select pgtle.uninstall_extension_if_exists('supabase-dbdev');

do $$
begin
  if exists (
    select 1
    from pg_catalog.pg_extension extension
    where extension.extname in (
      'basejump-supabase_test_helpers',
      'supabase-dbdev'
    )
  ) then
    raise exception 'test-helper extension cleanup was incomplete';
  end if;
end;
$$;
