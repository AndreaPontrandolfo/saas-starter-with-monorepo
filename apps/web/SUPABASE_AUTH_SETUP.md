# Supabase Auth Setup

This document describes the SQL migrations needed to enable per-user authentication and Row Level Security (RLS) for the todos table.

## Prerequisites

- Supabase project created
- Database connection established
- `todos` table exists (from initial schema)

## SQL Migrations

Run these SQL statements in your Supabase SQL Editor (Dashboard → SQL Editor):

### 1. Add user_id column to todos table

```sql
-- Add user_id column with foreign key to auth.users
ALTER TABLE public.todos
ADD COLUMN user_id UUID NOT NULL REFERENCES auth.users(id);

-- Create index for better query performance
CREATE INDEX idx_todos_user_id ON public.todos(user_id);
```

**Note:** If you have existing todos in the table, you'll need to either:

- Delete existing todos: `DELETE FROM public.todos;`
- Or assign them to a user: `UPDATE public.todos SET user_id = '<your-user-id>' WHERE user_id IS NULL;`

### 2. Enable Row Level Security

```sql
-- Enable RLS on the todos table
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;
```

### 3. Create RLS Policies

```sql
-- Policy: Users can SELECT only their own todos
CREATE POLICY "Users can view own todos"
ON public.todos
FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can INSERT only their own todos
CREATE POLICY "Users can insert own todos"
ON public.todos
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can UPDATE only their own todos
CREATE POLICY "Users can update own todos"
ON public.todos
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can DELETE only their own todos
CREATE POLICY "Users can delete own todos"
ON public.todos
FOR DELETE
USING (auth.uid() = user_id);
```

## Email Templates Setup

### 1. Sign-up Confirmation Email

In Supabase Dashboard → Authentication → Email Templates → Confirm signup:

```html
<h2>Confirm your signup</h2>

<p>Follow this link to confirm your user:</p>
<p>
  <a
    href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next={{ .RedirectTo }}"
  >
    Confirm your email
  </a>
</p>
```

### 2. Password Reset Email

In Supabase Dashboard → Authentication → Email Templates → Reset password:

```html
<h2>Reset Password</h2>

<p>Follow this link to reset the password for your user:</p>
<p>
  <a
    href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next={{ .RedirectTo }}"
  >
    Reset Password
  </a>
</p>
```

## URL Configuration

In Supabase Dashboard → Authentication → URL Configuration:

1. **Site URL**: Set to your production URL (e.g., `https://yourdomain.com`) or `http://localhost:3001` for local development

2. **Redirect URLs**: Add the following URLs:
   - `http://localhost:3001/auth/confirm` (for local development)
   - `http://localhost:3001/update-password` (for local development)
   - `https://yourdomain.com/auth/confirm` (for production)
   - `https://yourdomain.com/update-password` (for production)

## Testing

After completing the setup:

1. Sign up a new user → Check email → Click confirmation link → Should redirect to `/todos`
2. Sign in → Should see only your todos
3. Sign in as a different user → Should see only that user's todos
4. Forgot password → Check email → Click reset link → Update password → Should redirect to `/todos`

## Troubleshooting

### Error: "new row violates row-level security policy"

- Ensure RLS policies are created correctly
- Verify the user is authenticated (`auth.uid()` returns a value)
- Check that `user_id` matches `auth.uid()` in your queries

### Error: "foreign key constraint fails"

- Ensure the `user_id` column references `auth.users(id)` correctly
- Verify the user exists in `auth.users` before inserting todos

### Email not sending

- Check Supabase Dashboard → Authentication → Settings → Email Auth
- Verify SMTP settings if using custom SMTP
- Check spam folder
- For local development, emails may be sent to the Supabase logs (Dashboard → Logs → Auth Logs)
