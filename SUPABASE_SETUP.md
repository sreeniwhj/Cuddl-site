# CuddlWear Supabase Backend & Hardened Security Setup

This document details the hardened Supabase configuration for the CuddlWear Waitlist system.

---

## 1. Hardened SQL Schema

The table \`public.waitlist_entries\` stores pre-order waitlist leads with strict database-level constraints.

\`\`\`sql
CREATE TABLE IF NOT EXISTS public.waitlist_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    preferred_colorway TEXT NOT NULL,
    message TEXT,
    consent_given BOOLEAN NOT NULL DEFAULT true,
    consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
    status TEXT NOT NULL DEFAULT 'pending',

    -- Data integrity constraints
    CONSTRAINT check_full_name CHECK (length(trim(full_name)) >= 2 AND length(full_name) <= 100),
    CONSTRAINT check_email CHECK (length(email) <= 255 AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT check_phone CHECK (phone ~ '^[6-9][0-9]{9}$'),
    CONSTRAINT check_colorway CHECK (preferred_colorway IN ('Ash Grey', 'Sand Beige', 'Midnight Black', 'Powder Blue')),
    CONSTRAINT check_message_len CHECK (message IS NULL OR length(message) <= 1000),
    CONSTRAINT check_status CHECK (status IN ('pending', 'contacted', 'converted', 'archived')),
    CONSTRAINT check_consent CHECK (consent_given = true)
);

-- Case-insensitive unique index on email to prevent duplicate database spam
CREATE UNIQUE INDEX IF NOT EXISTS waitlist_entries_unique_email_idx ON public.waitlist_entries (lower(email));
\`\`\`

---

## 2. Hardened Row Level Security (RLS)

\`\`\`sql
-- Enable Row Level Security
ALTER TABLE public.waitlist_entries ENABLE ROW LEVEL SECURITY;

-- Allow ONLY anonymous visitors to insert with strict validation
CREATE POLICY "Allow anon insert only"
    ON public.waitlist_entries
    FOR INSERT
    TO anon
    WITH CHECK (
        consent_given = true AND
        status = 'pending' AND
        length(trim(full_name)) >= 2 AND
        length(full_name) <= 100 AND
        preferred_colorway IN ('Ash Grey', 'Sand Beige', 'Midnight Black', 'Powder Blue')
    );
\`\`\`

### Data Access Matrix

| Role | Operation | Permitted | Policy Rule |
| :--- | :--- | :--- | :--- |
| \`anon\` | \`INSERT\` | **Yes** | Allowed with \`WITH CHECK\` validation |
| \`anon\` | \`SELECT\` | **No** | Denied (returns 0 rows) |
| \`anon\` | \`UPDATE\` | **No** | Denied by RLS |
| \`anon\` | \`DELETE\` | **No** | Denied by RLS |
| \`service_role\` | All (\`SELECT\`, \`INSERT\`, \`UPDATE\`, \`DELETE\`) | **Yes** | Server-side administrative access only |

---

## 3. Duplicate Submission Strategy

- When an existing email is re-submitted, Postgres triggers unique constraint \`waitlist_entries_unique_email_idx\` (\`23505\`).
- The frontend service catches this error and returns a generic success response without exposing whether the email already exists in the system, eliminating user enumeration risks.

---

## 4. Abuse & Anti-Bot Protection

1. **Invisible Honeypot Field**: An invisible form input (\`website\`) traps automated bot scrapers. Submissions with a filled honeypot are silently neutralized without hitting the database.
2. **Client-Side Cooldown Throttle**: Enforces a 3-second cooldown to prevent double-click or rapid submission spam.
3. **Pre-Launch Requirement for Scale**:
   - For high-volume production launches, integrating **Cloudflare Turnstile** or **Supabase Edge Function Rate Limiting** (via Upstash Redis) is recommended to defend against distributed botnets.

---

## 5. Secrets & Environment Configuration

- \`.env\` is ignored by Git and only referenced via \`import.meta.env\`.
- **Public Key**: Only \`VITE_SUPABASE_ANON_KEY\` is included in client builds.
- **Service Role Key**: Never used or referenced in the frontend codebase.
