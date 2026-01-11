# Supabase Database Setup for Todos

## Create the todos table

Run this SQL in your Supabase SQL Editor (https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new):

```sql
-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (public access)
-- Note: In production, you should restrict this based on authenticated users
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

## Security Notes

The current policy allows **anyone** to read, create, update, and delete todos. This is fine for development/testing.

### For Production (with Authentication):

When you add authentication, update the RLS policies:

```sql
-- Drop the public policy
DROP POLICY IF EXISTS "Allow all operations on todos" ON todos;

-- Add user-specific policies
-- Only allow users to see their own todos
CREATE POLICY "Users can view own todos" ON todos
  FOR SELECT
  USING (auth.uid() = user_id);

-- Only allow users to create their own todos
CREATE POLICY "Users can create own todos" ON todos
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Only allow users to update their own todos
CREATE POLICY "Users can update own todos" ON todos
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Only allow users to delete their own todos
CREATE POLICY "Users can delete own todos" ON todos
  FOR DELETE
  USING (auth.uid() = user_id);
```

Note: You'll also need to add a `user_id UUID REFERENCES auth.users(id)` column to the todos table for user-specific access.

## Testing

After running the SQL:

1. Make sure your `.env` file has the Supabase credentials
2. Start the dev server: `pnpm dev`
3. Navigate to `/todos` in your web app
4. Try adding, completing, and deleting todos

The data will now persist in your Supabase database!
