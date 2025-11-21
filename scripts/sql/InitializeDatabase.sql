-- Enums
CREATE TYPE task_state AS ENUM ('NOT_STARTED', 'STARTED', 'COMPLETED');
CREATE TYPE note_type AS ENUM ('QUESTION', 'INFO', 'NEW_WORK', 'COMPLAINT');
CREATE TYPE permission_type AS ENUM ('ADMIN', 'USER');

-- Account
CREATE TABLE account (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar NOT NULL,
  email varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
  permission_type permission_type NOT NULL,
  picture varchar,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Journal
CREATE TABLE journal (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL,
  title varchar NOT NULL,
  description varchar,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (account_id) REFERENCES account(id) ON DELETE CASCADE
);

-- Scratch Pad (M:1 with Journal)
CREATE TABLE scratch_pad (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_id UUID NOT NULL,
  title varchar NOT NULL,
  content text,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (journal_id) REFERENCES journal(id) ON DELETE CASCADE
);

-- Journal Entry
CREATE TABLE journal_entry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_id UUID NOT NULL,
  tag varchar,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (journal_id) REFERENCES journal(id) ON DELETE CASCADE
);

-- Note
CREATE TABLE note (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID NOT NULL,
  content text NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (journal_entry_id) REFERENCES journal_entry(id) ON DELETE CASCADE
);

-- Task
CREATE TABLE task (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID NOT NULL,
  title varchar NOT NULL,
  description text,
  status task_state NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP,
  FOREIGN KEY (journal_entry_id) REFERENCES journal_entry(id) ON DELETE CASCADE
);

-- Review (1:1 with Journal Entry)
CREATE TABLE review (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  journal_entry_id UUID UNIQUE NOT NULL,
  content text NOT NULL,
  rating integer,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (journal_entry_id) REFERENCES journal_entry(id) ON DELETE CASCADE
);

-- Helpful indexes for your reads
CREATE INDEX idx_journal_account ON journal(account_id);
CREATE INDEX idx_entry_journal ON journal_entry(journal_id);
CREATE INDEX idx_task_entry ON task(journal_entry_id);
CREATE INDEX idx_note_entry ON note(journal_entry_id);
CREATE INDEX idx_sp_journal ON scratch_pad(journal_id);
