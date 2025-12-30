BEGIN;

-- 0) Ensure journal can be referenced by (id, account_id)
--    (Required for composite foreign keys.)
ALTER TABLE journal
  ADD CONSTRAINT journal_id_account_id_uniq UNIQUE (id, account_id);

-- 1) journal_entry: add + backfill + enforce + composite FK to journal
ALTER TABLE journal_entry
  ADD COLUMN IF NOT EXISTS account_id UUID;

UPDATE journal_entry e
SET account_id = j.account_id
FROM journal j
WHERE e.journal_id = j.id
  AND e.account_id IS NULL;

ALTER TABLE journal_entry
  ALTER COLUMN account_id SET NOT NULL;

ALTER TABLE journal_entry
  ADD CONSTRAINT journal_entry_id_account_id_uniq UNIQUE (id, account_id);

-- Drop old FK and replace with composite FK enforcing ownership
ALTER TABLE journal_entry
  DROP CONSTRAINT IF EXISTS journal_entry_journal_id_fkey;

ALTER TABLE journal_entry
  ADD CONSTRAINT journal_entry_journal_id_account_id_fkey
  FOREIGN KEY (journal_id, account_id)
  REFERENCES journal (id, account_id)
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_entry_account ON journal_entry(account_id);
CREATE INDEX IF NOT EXISTS idx_entry_account_journal ON journal_entry(account_id, journal_id);

-- 2) scratch_pad: add + backfill + enforce + composite FK to journal
ALTER TABLE scratch_pad
  ADD COLUMN IF NOT EXISTS account_id UUID;

UPDATE scratch_pad sp
SET account_id = j.account_id
FROM journal j
WHERE sp.journal_id = j.id
  AND sp.account_id IS NULL;

ALTER TABLE scratch_pad
  ALTER COLUMN account_id SET NOT NULL;

-- Drop old FK and replace with composite FK enforcing ownership
ALTER TABLE scratch_pad
  DROP CONSTRAINT IF EXISTS scratch_pad_journal_id_fkey;

ALTER TABLE scratch_pad
  ADD CONSTRAINT scratch_pad_journal_id_account_id_fkey
  FOREIGN KEY (journal_id, account_id)
  REFERENCES journal (id, account_id)
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_sp_account ON scratch_pad(account_id);
CREATE INDEX IF NOT EXISTS idx_sp_account_journal ON scratch_pad(account_id, journal_id);

-- 3) note: add + backfill + enforce + composite FK to journal_entry
ALTER TABLE note
  ADD COLUMN IF NOT EXISTS account_id UUID;

UPDATE note n
SET account_id = e.account_id
FROM journal_entry e
WHERE n.journal_entry_id = e.id
  AND n.account_id IS NULL;

ALTER TABLE note
  ALTER COLUMN account_id SET NOT NULL;

ALTER TABLE note
  DROP CONSTRAINT IF EXISTS note_journal_entry_id_fkey;

ALTER TABLE note
  ADD CONSTRAINT note_journal_entry_id_account_id_fkey
  FOREIGN KEY (journal_entry_id, account_id)
  REFERENCES journal_entry (id, account_id)
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_note_account ON note(account_id);
CREATE INDEX IF NOT EXISTS idx_note_account_entry ON note(account_id, journal_entry_id);

-- 4) task: add + backfill + enforce + composite FK to journal_entry
ALTER TABLE task
  ADD COLUMN IF NOT EXISTS account_id UUID;

UPDATE task t
SET account_id = e.account_id
FROM journal_entry e
WHERE t.journal_entry_id = e.id
  AND t.account_id IS NULL;

ALTER TABLE task
  ALTER COLUMN account_id SET NOT NULL;

ALTER TABLE task
  DROP CONSTRAINT IF EXISTS task_journal_entry_id_fkey;

ALTER TABLE task
  ADD CONSTRAINT task_journal_entry_id_account_id_fkey
  FOREIGN KEY (journal_entry_id, account_id)
  REFERENCES journal_entry (id, account_id)
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_task_account ON task(account_id);
CREATE INDEX IF NOT EXISTS idx_task_account_entry ON task(account_id, journal_entry_id);

-- 5) review: add + backfill + enforce + composite FK to journal_entry
ALTER TABLE review
  ADD COLUMN IF NOT EXISTS account_id UUID;

UPDATE review r
SET account_id = e.account_id
FROM journal_entry e
WHERE r.journal_entry_id = e.id
  AND r.account_id IS NULL;

ALTER TABLE review
  ALTER COLUMN account_id SET NOT NULL;

ALTER TABLE review
  DROP CONSTRAINT IF EXISTS review_journal_entry_id_fkey;

ALTER TABLE review
  ADD CONSTRAINT review_journal_entry_id_account_id_fkey
  FOREIGN KEY (journal_entry_id, account_id)
  REFERENCES journal_entry (id, account_id)
  ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_review_account ON review(account_id);
CREATE INDEX IF NOT EXISTS idx_review_account_entry ON review(account_id, journal_entry_id);

COMMIT;
