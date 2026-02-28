BEGIN;

DO $$
DECLARE
  v_account_id uuid := 'f870d886-fc00-4002-9bb4-d45cc6673a94';

  v_journal_work uuid := gen_random_uuid();
  v_journal_personal uuid := gen_random_uuid();

  d date;

  -- entry ids
  e1 uuid; e2 uuid; e3 uuid; e4 uuid; e5 uuid;
  e6 uuid; e7 uuid; e8 uuid; e9 uuid; e10 uuid;
BEGIN
  ---------------------------------------------------------------------------
  -- Create two journals
  ---------------------------------------------------------------------------
  INSERT INTO journal (id, account_id, title, description, created_at, updated_at)
  VALUES
    (v_journal_work, v_account_id,
     'Work Journal — Platform & API Delivery',
     'Daily log for engineering work: tickets, meetings, debugging, releases, and follow-ups.',
     now(), now()),
    (v_journal_personal, v_account_id,
     'Personal Project Journal — Side SaaS Build',
     'Daily log for a personal software project: planning, implementation, refactors, and learnings.',
     now(), now());

  ---------------------------------------------------------------------------
  -- WORK JOURNAL: 10 daily entries
  ---------------------------------------------------------------------------
  d := current_date - 20;

  -- Day 1
  e1 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e1, v_journal_work, v_account_id,
          'Day 1: Sprint kickoff + scope alignment',
          ARRAY['work','planning','sprint','meetings'],
          d + time '09:05', d + time '18:10');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e1, v_account_id, 'NOTE',     'Aligned on sprint goals: stabilize auth flows, improve observability, and ship rate-limit middleware.', d + time '10:05', d + time '10:05'),
    (e1, v_account_id, 'QUESTION', 'Should we enforce per-user or per-IP limits for the public endpoints?', d + time '11:40', d + time '11:40'),
    (e1, v_account_id, 'NOTE',     'New work identified: add structured logging fields (request_id, account_id, route, latency_ms).', d + time '14:10', d + time '14:10');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e1, v_account_id, 'Draft sprint plan', 'Break down work into deliverables + identify dependencies across services.', 'COMPLETED', d + time '09:30', d + time '12:15', d + time '12:15'),
    (e1, v_account_id, 'Add ticket for rate-limit middleware', 'Create ticket with acceptance criteria + rollout plan.', 'COMPLETED', d + time '13:00', d + time '13:30', d + time '13:30'),
    (e1, v_account_id, 'Investigate auth callback failures', 'Collect logs, reproduce locally, identify if regression from last deploy.', 'STARTED', d + time '15:00', d + time '18:00', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e1, v_account_id,
          'Good kickoff. Left with a clear sprint plan and a short list of unknowns (rate limit strategy + auth callback flakiness).',
          4, d + time '18:05', d + time '18:05');

  -- Day 2
  d := d + 1;
  e2 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e2, v_journal_work, v_account_id,
          'Day 2: Debugged auth callback + added instrumentation',
          ARRAY['work','debugging','auth','observability'],
          d + time '09:10', d + time '18:25');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e2, v_account_id, 'ISSUE',    'Reproduced callback failures: intermittent 400 due to missing state param when user has multiple tabs open.', d + time '10:20', d + time '10:20'),
    (e2, v_account_id, 'NOTE',     'Added INFO logs around OAuth state creation/validation with request_id correlation.', d + time '13:15', d + time '13:15'),
    (e2, v_account_id, 'QUESTION', 'Should we store OAuth state in server-side session vs. signed cookie to handle multi-tab better?', d + time '16:10', d + time '16:10');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e2, v_account_id, 'Add request_id propagation', 'Ensure request_id is present across gateway → service → DB logs.', 'COMPLETED', d + time '09:30', d + time '12:00', d + time '12:00'),
    (e2, v_account_id, 'Patch OAuth state handling', 'Make state unique per tab; tolerate replay within a short TTL if same user.', 'STARTED', d + time '12:30', d + time '18:00', NULL),
    (e2, v_account_id, 'Write regression test for multi-tab login', 'Automate with two parallel sessions.', 'NOT_STARTED', d + time '17:30', d + time '17:30', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e2, v_account_id,
          'Solid progress: found root cause and improved visibility. Still need the fix + tests before deploying confidently.',
          4, d + time '18:20', d + time '18:20');

  -- Day 3
  d := d + 1;
  e3 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e3, v_journal_work, v_account_id,
          'Day 3: Rate limiting design + proof of concept',
          ARRAY['work','api','security','design'],
          d + time '09:00', d + time '17:55');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e3, v_account_id, 'NOTE',     'Drafted strategy: per-account for authenticated routes; per-IP for unauthenticated; bypass for internal health checks.', d + time '10:10', d + time '10:10'),
    (e3, v_account_id, 'ISSUE',    'Existing middleware stack makes it awkward to short-circuit responses consistently.', d + time '12:05', d + time '12:05'),
    (e3, v_account_id, 'NOTE',     'New work: add response headers (RateLimit-Limit/Remaining/Reset) for client visibility.', d + time '15:20', d + time '15:20');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e3, v_account_id, 'Implement PoC middleware', 'Simple token-bucket in Redis keyed by route + account/ip.', 'COMPLETED', d + time '09:30', d + time '13:40', d + time '13:40'),
    (e3, v_account_id, 'Write ADR for rate-limit approach', 'Document tradeoffs, rollout, and monitoring plan.', 'STARTED', d + time '14:00', d + time '17:45', NULL),
    (e3, v_account_id, 'Add header contract to API docs', 'Update docs + examples for 429 responses.', 'NOT_STARTED', d + time '17:45', d + time '17:45', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e3, v_account_id,
          'PoC is working and the approach feels right. Need to cleanly integrate into middleware chain and document thoroughly.',
          4, d + time '17:50', d + time '17:50');

  -- Day 4
  d := d + 1;
  e4 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e4, v_journal_work, v_account_id,
          'Day 4: Fix OAuth state + add regression coverage',
          ARRAY['work','auth','testing','bugfix'],
          d + time '09:05', d + time '18:05');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e4, v_account_id, 'NOTE',     'Implemented server-side state store with TTL to support multi-tab flows safely.', d + time '10:45', d + time '10:45'),
    (e4, v_account_id, 'NOTE',     'Added integration test that opens two sessions and validates both callbacks.', d + time '14:10', d + time '14:10'),
    (e4, v_account_id, 'NOTE',     'Staging runs: callback failure rate dropped to zero across 200 runs.', d + time '16:55', d + time '16:55');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e4, v_account_id, 'Finish OAuth fix', 'Move state to server store; keep signed cookie as pointer only.', 'COMPLETED', d + time '09:15', d + time '12:30', d + time '12:30'),
    (e4, v_account_id, 'Add regression tests', 'Parallel session test + edge cases for expired state.', 'COMPLETED', d + time '12:45', d + time '15:30', d + time '15:30'),
    (e4, v_account_id, 'Prep staging deploy', 'Deploy + monitor auth callback metrics.', 'STARTED', d + time '16:00', d + time '18:00', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e4, v_account_id,
          'Felt productive. Fix is cleaner than the previous cookie-only approach and tests give confidence.',
          5, d + time '18:02', d + time '18:02');

  -- Day 5
  d := d + 1;
  e5 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e5, v_journal_work, v_account_id,
          'Day 5: Rate limiting integration + metrics',
          ARRAY['work','api','middleware','metrics'],
          d + time '09:00', d + time '18:15');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e5, v_account_id, 'NOTE',     'Integrated token-bucket limiter into gateway with consistent 429 responses.', d + time '10:30', d + time '10:30'),
    (e5, v_account_id, 'QUESTION', 'Do we want separate limits for write endpoints vs read endpoints?', d + time '12:15', d + time '12:15'),
    (e5, v_account_id, 'NOTE',     'New work: dashboards for 429 rate by route and top offending IPs.', d + time '15:40', d + time '15:40');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e5, v_account_id, 'Add 429 response contract', 'Standardize JSON body + headers for clients.', 'COMPLETED', d + time '09:20', d + time '11:00', d + time '11:00'),
    (e5, v_account_id, 'Add Prometheus counters', 'Track rate_limit_blocked_total and latency impact.', 'COMPLETED', d + time '11:15', d + time '14:00', d + time '14:00'),
    (e5, v_account_id, 'Create initial Grafana panel', 'Chart 429s over time with route breakdown.', 'STARTED', d + time '14:30', d + time '18:00', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e5, v_account_id,
          'Rate limiting is in place and measurable. Next step is tuning limits and making dashboards actually useful.',
          4, d + time '18:10', d + time '18:10');

  -- Day 6
  d := d + 1;
  e6 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e6, v_journal_work, v_account_id,
          'Day 6: Release prep + incident follow-up',
          ARRAY['work','release','ops','followup'],
          d + time '09:20', d + time '17:40');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e6, v_account_id, 'NOTE',  'Reviewed staging metrics: auth callbacks stable; rate limit middleware adds ~2–4ms p95.', d + time '10:10', d + time '10:10'),
    (e6, v_account_id, 'ISSUE', 'Release checklist is scattered across docs and tribal knowledge.', d + time '11:50', d + time '11:50'),
    (e6, v_account_id, 'NOTE',  'New work: consolidate release checklist into repo and automate smoke tests.', d + time '15:05', d + time '15:05');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e6, v_account_id, 'Finalize release notes', 'Summarize auth fix + rate limiting changes + known issues.', 'COMPLETED', d + time '09:30', d + time '10:45', d + time '10:45'),
    (e6, v_account_id, 'Run pre-prod load test', 'Validate no Redis hot keys; confirm limiter behavior under burst.', 'COMPLETED', d + time '11:00', d + time '14:20', d + time '14:20'),
    (e6, v_account_id, 'Draft release checklist PR', 'Add a single markdown checklist in repo root.', 'STARTED', d + time '14:45', d + time '17:30', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e6, v_account_id,
          'Prep day. Nothing flashy, but the system looks stable and we reduced risk before pushing to prod.',
          4, d + time '17:35', d + time '17:35');

  -- Day 7
  d := d + 1;
  e7 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e7, v_journal_work, v_account_id,
          'Day 7: Production deploy + monitoring',
          ARRAY['work','deploy','monitoring','prod'],
          d + time '09:00', d + time '18:05');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e7, v_account_id, 'NOTE',     'Deployed auth fix + rate limiting to prod. No rollback needed.', d + time '11:05', d + time '11:05'),
    (e7, v_account_id, 'NOTE',     '429s started appearing on a noisy endpoint; confirms limiter is active.', d + time '13:30', d + time '13:30'),
    (e7, v_account_id, 'QUESTION', 'Should we notify customers proactively when they approach limits?', d + time '16:20', d + time '16:20');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e7, v_account_id, 'Execute deploy plan', 'Deploy in phases, validate key endpoints, monitor errors and latency.', 'COMPLETED', d + time '09:30', d + time '12:00', d + time '12:00'),
    (e7, v_account_id, 'Verify auth callback KPI', 'Watch callback_success_rate and timeouts for 2 hours post deploy.', 'COMPLETED', d + time '12:00', d + time '14:15', d + time '14:15'),
    (e7, v_account_id, 'Tune rate-limit thresholds', 'Adjust burst/steady values based on early traffic patterns.', 'STARTED', d + time '14:30', d + time '18:00', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e7, v_account_id,
          'Successful deploy. A few noisy clients hit 429 quickly, which is expected—need to refine limits and comms.',
          5, d + time '18:00', d + time '18:00');

  -- Day 8
  d := d + 1;
  e8 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e8, v_journal_work, v_account_id,
          'Day 8: Post-deploy cleanup + tech debt',
          ARRAY['work','cleanup','techdebt','docs'],
          d + time '09:15', d + time '17:50');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e8, v_account_id, 'ISSUE', 'Reviewed top 429 offenders and found one internal job missing backoff/retry.', d + time '10:10', d + time '10:10'),
    (e8, v_account_id, 'NOTE',  'New work: add client-side exponential backoff standard in internal SDK.', d + time '12:30', d + time '12:30'),
    (e8, v_account_id, 'NOTE',  'Updated runbook with “rate limit investigation” section.', d + time '15:10', d + time '15:10');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e8, v_account_id, 'Fix internal job retries', 'Ensure backoff and jitter are applied; cap max retries.', 'COMPLETED', d + time '09:30', d + time '12:00', d + time '12:00'),
    (e8, v_account_id, 'Update runbook', 'Document 429 troubleshooting + dashboard links.', 'COMPLETED', d + time '13:00', d + time '15:20', d + time '15:20'),
    (e8, v_account_id, 'Refactor limiter config', 'Move per-route limits into config file with defaults.', 'STARTED', d + time '15:30', d + time '17:45', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e8, v_account_id,
          'Good cleanup day. Reduced self-inflicted 429s and improved documentation for on-call.',
          4, d + time '17:48', d + time '17:48');

  -- Day 9
  d := d + 1;
  e9 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e9, v_journal_work, v_account_id,
          'Day 9: Middleware config + load validation',
          ARRAY['work','performance','config','redis'],
          d + time '09:00', d + time '18:00');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e9, v_account_id, 'NOTE',     'Moved limits to config with sensible defaults; enabled overrides for “hot” routes.', d + time '10:25', d + time '10:25'),
    (e9, v_account_id, 'QUESTION', 'Should config be dynamic (hot reload) or deploy-time only?', d + time '12:10', d + time '12:10'),
    (e9, v_account_id, 'NOTE',     'Load test shows stable Redis CPU and no obvious hot keys after key hashing changes.', d + time '16:40', d + time '16:40');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e9, v_account_id, 'Implement config refactor', 'Centralize per-route limits + default policies.', 'COMPLETED', d + time '09:15', d + time '11:30', d + time '11:30'),
    (e9, v_account_id, 'Run load tests', 'Validate limiter under burst traffic; compare p95 latency.', 'COMPLETED', d + time '13:00', d + time '16:50', d + time '16:50'),
    (e9, v_account_id, 'Draft proposal for dynamic config', 'Outline how to roll out hot-reload safely.', 'NOT_STARTED', d + time '17:10', d + time '17:10', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e9, v_account_id,
          'Limiter is now configurable and tested. Next decision is dynamic config vs. controlled deploys.',
          4, d + time '17:55', d + time '17:55');

  -- Day 10
  d := d + 1;
  e10 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e10, v_journal_work, v_account_id,
          'Day 10: Wrap sprint + retrospective notes',
          ARRAY['work','retro','planning','process'],
          d + time '09:10', d + time '16:45');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e10, v_account_id, 'NOTE',  'Retro: biggest win was eliminating auth callback flakiness and adding traceable request_id logging.', d + time '10:30', d + time '10:30'),
    (e10, v_account_id, 'ISSUE', 'Too many “drive-by” requests during deploy week; need clearer on-call boundaries.', d + time '11:20', d + time '11:20'),
    (e10, v_account_id, 'NOTE',  'New work: schedule a weekly “tech debt hour” and keep release checklist in-repo.', d + time '14:05', d + time '14:05');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e10, v_account_id, 'Close remaining tickets', 'Update statuses, link PRs, and write follow-ups.', 'COMPLETED', d + time '09:20', d + time '10:10', d + time '10:10'),
    (e10, v_account_id, 'Write sprint summary', 'What shipped, metrics impact, and next sprint recommendations.', 'COMPLETED', d + time '10:15', d + time '12:00', d + time '12:00'),
    (e10, v_account_id, 'Plan next sprint draft', 'Propose priorities: dynamic config, dashboards, SDK backoff standard.', 'STARTED', d + time '13:00', d + time '16:30', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e10, v_account_id,
          'Strong sprint outcome. Process can improve, but reliability and observability are noticeably better now.',
          5, d + time '16:40', d + time '16:40');

  ---------------------------------------------------------------------------
  -- PERSONAL PROJECT JOURNAL: 10 daily entries
  ---------------------------------------------------------------------------
  d := current_date - 20;

  -- Day 1
  e1 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e1, v_journal_personal, v_account_id,
          'Day 1: Define MVP + architecture sketch',
          ARRAY['personal','mvp','architecture','planning'],
          d + time '19:10', d + time '22:30');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e1, v_account_id, 'NOTE',     'MVP: a lightweight dev journal app with tasks/notes/reviews per day + fast search and tags.', d + time '19:40', d + time '19:40'),
    (e1, v_account_id, 'QUESTION', 'Should I start with server-rendered pages for speed or a SPA for richer UX?', d + time '20:20', d + time '20:20'),
    (e1, v_account_id, 'NOTE',     'New work: create DB schema + seed script + basic CRUD endpoints.', d + time '21:15', d + time '21:15');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e1, v_account_id, 'Write MVP spec', 'List core screens, data model, and non-goals.', 'COMPLETED', d + time '19:15', d + time '20:10', d + time '20:10'),
    (e1, v_account_id, 'Create repo + tooling', 'Initialize project, formatter, linting, and CI skeleton.', 'COMPLETED', d + time '20:15', d + time '21:00', d + time '21:00'),
    (e1, v_account_id, 'Choose stack', 'Pick backend framework + DB + auth approach.', 'STARTED', d + time '21:05', d + time '22:25', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e1, v_account_id,
          'Nice start. Clear MVP and a realistic plan. Still deciding between SSR and SPA, but either is fine for v1.',
          4, d + time '22:28', d + time '22:28');

  -- Day 2
  d := d + 1;
  e2 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e2, v_journal_personal, v_account_id,
          'Day 2: Authentication approach + initial schema',
          ARRAY['personal','auth','database','schema'],
          d + time '19:05', d + time '22:10');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e2, v_account_id, 'NOTE',     'Decided: cookie-based sessions for v1, add OAuth later if needed.', d + time '19:30', d + time '19:30'),
    (e2, v_account_id, 'NOTE',     'Drafted tables for account/journal/entry/task/note/review with ownership enforcement.', d + time '20:10', d + time '20:10'),
    (e2, v_account_id, 'QUESTION', 'Do I want soft deletes or rely on ON DELETE CASCADE?', d + time '21:05', d + time '21:05');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e2, v_account_id, 'Create migrations', 'Write initial migration for core tables and enums.', 'COMPLETED', d + time '19:10', d + time '20:40', d + time '20:40'),
    (e2, v_account_id, 'Add local dev compose', 'Postgres + app container + health checks.', 'COMPLETED', d + time '20:45', d + time '21:30', d + time '21:30'),
    (e2, v_account_id, 'Decide delete strategy', 'Document soft vs hard delete tradeoffs.', 'NOT_STARTED', d + time '21:40', d + time '21:40', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e2, v_account_id,
          'Good momentum. Schema is straightforward and ownership constraints will prevent accidental cross-user reads.',
          4, d + time '22:05', d + time '22:05');

  -- Day 3
  d := d + 1;
  e3 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e3, v_journal_personal, v_account_id,
          'Day 3: CRUD endpoints for journals and entries',
          ARRAY['personal','api','crud','backend'],
          d + time '19:00', d + time '22:45');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e3, v_account_id, 'NOTE',     'Implemented create/list/update/delete for journals and journal entries, scoped by account_id.', d + time '20:05', d + time '20:05'),
    (e3, v_account_id, 'QUESTION', 'Should tags be normalized or keep varchar[] for now?', d + time '21:10', d + time '21:10'),
    (e3, v_account_id, 'ISSUE',    'Writing API docs manually is tedious—need lightweight OpenAPI generation.', d + time '22:00', d + time '22:00');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e3, v_account_id, 'Implement journals CRUD', 'Endpoints + basic validation + ownership checks.', 'COMPLETED', d + time '19:10', d + time '20:10', d + time '20:10'),
    (e3, v_account_id, 'Implement entries CRUD', 'Endpoints + tags support + pagination.', 'COMPLETED', d + time '20:15', d + time '21:45', d + time '21:45'),
    (e3, v_account_id, 'Add OpenAPI docs', 'Auto-generate or write minimal spec.', 'STARTED', d + time '21:50', d + time '22:40', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e3, v_account_id,
          'Core CRUD is in place. Next: notes/tasks/reviews endpoints and a basic UI so it feels real.',
          4, d + time '22:43', d + time '22:43');

  -- Day 4
  d := d + 1;
  e4 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e4, v_journal_personal, v_account_id,
          'Day 4: Notes + tasks endpoints',
          ARRAY['personal','api','tasks','notes'],
          d + time '19:10', d + time '23:00');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e4, v_account_id, 'NOTE',     'Added endpoints to attach notes and tasks to an entry; ensured composite FK account_id is always set.', d + time '20:05', d + time '20:05'),
    (e4, v_account_id, 'NOTE',     'Task status transitions allow NOT_STARTED → STARTED → COMPLETED; set finished_at on completion.', d + time '21:10', d + time '21:10'),
    (e4, v_account_id, 'QUESTION', 'Do I want partial updates for tasks (PATCH) or keep PUT only?', d + time '22:25', d + time '22:25');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e4, v_account_id, 'Create notes CRUD', 'Create/list/delete notes on a journal entry.', 'COMPLETED', d + time '19:20', d + time '20:30', d + time '20:30'),
    (e4, v_account_id, 'Create tasks CRUD', 'Create/list/update status; set finished_at when completed.', 'COMPLETED', d + time '20:40', d + time '22:10', d + time '22:10'),
    (e4, v_account_id, 'Add validation rules', 'Non-empty title; status enum checks; max lengths.', 'STARTED', d + time '22:15', d + time '22:55', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e4, v_account_id,
          'This was a big functional chunk—notes and tasks make the app immediately more useful. Need polish and UI next.',
          5, d + time '22:58', d + time '22:58');

  -- Day 5
  d := d + 1;
  e5 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e5, v_journal_personal, v_account_id,
          'Day 5: Reviews + rating and entry summary',
          ARRAY['personal','reviews','feature','ux'],
          d + time '19:00', d + time '22:20');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e5, v_account_id, 'NOTE',     'Implemented 1:1 review per entry and enforced uniqueness via journal_entry_id unique constraint.', d + time '20:05', d + time '20:05'),
    (e5, v_account_id, 'NOTE',     'Added rating 1–5 in API validation (null allowed).', d + time '20:50', d + time '20:50'),
    (e5, v_account_id, 'QUESTION', 'Should review be required for a “completed day” or optional always?', d + time '21:30', d + time '21:30');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e5, v_account_id, 'Add review endpoints', 'Create/update/get review for an entry.', 'COMPLETED', d + time '19:10', d + time '20:40', d + time '20:40'),
    (e5, v_account_id, 'Add rating validation', 'Accept null or 1..5; reject out-of-range.', 'COMPLETED', d + time '20:45', d + time '21:10', d + time '21:10'),
    (e5, v_account_id, 'Add “entry summary” endpoint', 'Return entry + tasks + notes + review in one call.', 'STARTED', d + time '21:15', d + time '22:15', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e5, v_account_id,
          'Reviews complete the daily workflow. The summary endpoint will make the front-end much simpler.',
          4, d + time '22:18', d + time '22:18');

  -- Day 6
  d := d + 1;
  e6 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e6, v_journal_personal, v_account_id,
          'Day 6: First UI pass (list journals + entries)',
          ARRAY['personal','frontend','ui','integration'],
          d + time '19:15', d + time '23:05');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e6, v_account_id, 'NOTE',  'Built simple UI to list journals and recent entries; hooked up to summary endpoint.', d + time '20:10', d + time '20:10'),
    (e6, v_account_id, 'ISSUE', 'Pagination UX feels clunky; need “infinite scroll” or “load more”.', d + time '21:35', d + time '21:35'),
    (e6, v_account_id, 'NOTE',  'New work: add entry detail page with tasks/notes/review editing.', d + time '22:25', d + time '22:25');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e6, v_account_id, 'Create journal list page', 'Display journals + description + quick create.', 'COMPLETED', d + time '19:20', d + time '20:40', d + time '20:40'),
    (e6, v_account_id, 'Create entry list page', 'Show latest entries with tags and created date.', 'COMPLETED', d + time '20:45', d + time '21:45', d + time '21:45'),
    (e6, v_account_id, 'Design entry detail UI', 'Layout tasks/notes/review sections; decide editing patterns.', 'STARTED', d + time '21:50', d + time '23:00', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e6, v_account_id,
          'Seeing the UI makes it feel real. Next is making entry detail editing pleasant and fast.',
          5, d + time '23:03', d + time '23:03');

  -- Day 7
  d := d + 1;
  e7 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e7, v_journal_personal, v_account_id,
          'Day 7: Entry detail editing (tasks + notes)',
          ARRAY['personal','frontend','tasks','notes'],
          d + time '19:00', d + time '22:35');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e7, v_account_id, 'NOTE',     'Implemented task editing: create, update status, mark completed sets finished_at.', d + time '20:00', d + time '20:00'),
    (e7, v_account_id, 'QUESTION', 'Do I want rich text notes or keep plain text for speed?', d + time '21:05', d + time '21:05'),
    (e7, v_account_id, 'NOTE',     'Added optimistic UI updates with rollback on failure.', d + time '22:00', d + time '22:00');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e7, v_account_id, 'Build task editor UI', 'Inline editing, status dropdown, completion timestamp.', 'COMPLETED', d + time '19:10', d + time '20:45', d + time '20:45'),
    (e7, v_account_id, 'Build notes editor UI', 'Add/delete notes; simple textarea with autosize.', 'COMPLETED', d + time '20:50', d + time '21:55', d + time '21:55'),
    (e7, v_account_id, 'Improve error handling', 'Show toast on API errors; rollback optimistic changes.', 'STARTED', d + time '22:00', d + time '22:30', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e7, v_account_id,
          'Entry editing feels usable now. Biggest remaining UX piece is review editing and better navigation/search.',
          4, d + time '22:33', d + time '22:33');

  -- Day 8
  d := d + 1;
  e8 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e8, v_journal_personal, v_account_id,
          'Day 8: Review UI + daily workflow polish',
          ARRAY['personal','frontend','review','polish'],
          d + time '19:10', d + time '22:50');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e8, v_account_id, 'NOTE',  'Added review editor with rating picker and “end of day” prompt.', d + time '20:00', d + time '20:00'),
    (e8, v_account_id, 'ISSUE', 'State management is getting messy; consider a lightweight store pattern.', d + time '21:20', d + time '21:20'),
    (e8, v_account_id, 'NOTE',  'New work: add search by tag and full-text in notes/reviews.', d + time '22:10', d + time '22:10');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e8, v_account_id, 'Add review editor UI', 'Create/update review; enforce single review per entry.', 'COMPLETED', d + time '19:15', d + time '20:40', d + time '20:40'),
    (e8, v_account_id, 'Polish navigation', 'Breadcrumbs + back links + entry date display.', 'COMPLETED', d + time '20:45', d + time '21:30', d + time '21:30'),
    (e8, v_account_id, 'Design search UX', 'Search box + filters for journal and tags.', 'STARTED', d + time '21:35', d + time '22:45', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e8, v_account_id,
          'Workflow is close to “daily usable.” Search is the next big lever for making the app stick.',
          4, d + time '22:48', d + time '22:48');

  -- Day 9
  d := d + 1;
  e9 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e9, v_journal_personal, v_account_id,
          'Day 9: Search + indexing plan',
          ARRAY['personal','search','postgres','indexing'],
          d + time '19:00', d + time '22:15');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e9, v_account_id, 'NOTE',     'Sketched approach: start with ILIKE queries; later add tsvector index for notes/reviews.', d + time '19:50', d + time '19:50'),
    (e9, v_account_id, 'QUESTION', 'Should tags be stored lowercased to simplify search and de-dupe?', d + time '20:40', d + time '20:40'),
    (e9, v_account_id, 'NOTE',     'Added a basic endpoint to search entries by title/tags.', d + time '21:30', d + time '21:30');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e9, v_account_id, 'Add entry search endpoint', 'Search by journal_id + query string; include tags filter.', 'COMPLETED', d + time '19:05', d + time '20:30', d + time '20:30'),
    (e9, v_account_id, 'Add basic UI search box', 'Wire to search endpoint; show results list.', 'COMPLETED', d + time '20:35', d + time '21:40', d + time '21:40'),
    (e9, v_account_id, 'Plan FTS upgrade', 'Decide which columns go into tsvector and how to rank results.', 'NOT_STARTED', d + time '21:45', d + time '21:45', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e9, v_account_id,
          'Search is basic but functional. Full-text search can wait until there’s enough real content to justify it.',
          4, d + time '22:12', d + time '22:12');

  -- Day 10
  d := d + 1;
  e10 := gen_random_uuid();
  INSERT INTO journal_entry (id, journal_id, account_id, title, tags, created_at, updated_at)
  VALUES (e10, v_journal_personal, v_account_id,
          'Day 10: Polish + backlog grooming',
          ARRAY['personal','polish','backlog','qa'],
          d + time '19:10', d + time '22:00');

  INSERT INTO note (journal_entry_id, account_id, type, content, created_at, updated_at) VALUES
    (e10, v_account_id, 'NOTE',  'QA pass: fixed edge cases around empty tasks and long note content rendering.', d + time '19:55', d + time '19:55'),
    (e10, v_account_id, 'ISSUE', 'No import/export yet; feels risky to store journaling data without backup.', d + time '20:45', d + time '20:45'),
    (e10, v_account_id, 'NOTE',  'New work: add export to JSON/CSV and maybe a simple nightly backup job.', d + time '21:30', d + time '21:30');

  INSERT INTO task (journal_entry_id, account_id, title, description, status, created_at, updated_at, finished_at) VALUES
    (e10, v_account_id, 'Fix UI edge cases', 'Handle empty states; trim whitespace; improve loading indicators.', 'COMPLETED', d + time '19:15', d + time '20:10', d + time '20:10'),
    (e10, v_account_id, 'Backlog grooming', 'Prioritize export/import, FTS, mobile-friendly layout, auth hardening.', 'COMPLETED', d + time '20:15', d + time '21:10', d + time '21:10'),
    (e10, v_account_id, 'Export prototype', 'Create endpoint to export a journal with entries/tasks/notes/reviews.', 'STARTED', d + time '21:15', d + time '21:55', NULL);

  INSERT INTO review (journal_entry_id, account_id, content, rating, created_at, updated_at)
  VALUES (e10, v_account_id,
          'App is usable for daily logging. Next focus is data safety (export/backup) and improving search over time.',
          5, d + time '21:58', d + time '21:58');

END $$;

COMMIT;