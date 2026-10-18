-- Local-test bootstrap based on Supabase's Advanced pgTAP Testing guide.
-- This file intentionally lives under tests/ and must never become a production migration.

create extension if not exists pgtap with schema extensions;
create extension if not exists http with schema extensions;
create extension if not exists pg_tle;

-- Local Docker DNS can occasionally exceed pgsql-http's one-second default
-- connection timeout while resolving database.dev.
select extensions.http_set_curlopt('CURLOPT_CONNECTTIMEOUT_MS', '10000');
select extensions.http_set_curlopt('CURLOPT_TIMEOUT_MS', '30000');

drop extension if exists "supabase-dbdev";
select pgtle.uninstall_extension_if_exists('supabase-dbdev');

select pgtle.install_extension(
  'supabase-dbdev',
  response.contents ->> 'version',
  'PostgreSQL package manager',
  response.contents ->> 'sql'
)
from extensions.http(
  (
    'GET',
    'https://api.database.dev/rest/v1/'
      || 'package_versions?select=sql,version'
      || '&package_name=eq.supabase-dbdev'
      || '&order=version.desc'
      || '&limit=1',
    array[
      -- Public database.dev registry anon key published in the official Supabase guide;
      -- this is not a credential for this DermaAI project.
      (
        'apiKey',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWZyYndtbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMDczNzIsImV4cCI6MTk5NTY4MzM3Mn0.z2CN0mvO2No8wSi46Gw59DFGCTJrzM0AQKsu_5k134s'
      )::extensions.http_header
    ],
    null,
    null
  )
) request,
lateral (
  select ((row_to_json(request) -> 'content') #>> '{}')::json -> 0
) response(contents);

create extension "supabase-dbdev";
select dbdev.install('supabase-dbdev');

-- Recreate after dbdev installs its current package metadata.
drop extension if exists "supabase-dbdev";
create extension "supabase-dbdev";

select dbdev.install('basejump-supabase_test_helpers');
create extension if not exists "basejump-supabase_test_helpers" version '0.0.6';

do $$
declare
  installed_version text;
begin
  select extension.extversion
  into installed_version
  from pg_catalog.pg_extension extension
  where extension.extname = 'basejump-supabase_test_helpers';

  if installed_version is distinct from '0.0.6' then
    raise exception
      'Expected basejump-supabase_test_helpers 0.0.6, found %',
      coalesce(installed_version, '<not installed>');
  end if;
end;
$$;

begin;
select plan(1);
select ok(
  to_regprocedure('tests.create_supabase_user(text,text,text,jsonb)') is not null,
  'basejump Supabase test helpers 0.0.6 are available'
);
select * from finish();
rollback;
