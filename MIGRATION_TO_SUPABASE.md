# Migration from Mock to Supabase

The Todo app has been migrated from using mock in-memory data to using **Supabase** with direct client-side queries.

## What Changed

### 1. Frontend (`apps/web/src/routes/todos.tsx`)

- Removed dependency on the API router (oRPC)
- Now uses the Supabase client directly for all CRUD operations
- Added proper error handling for Supabase queries
- Data now persists in your Supabase database

### 2. Database

- Switched from Drizzle ORM + PostgreSQL to Supabase client SDK
- Uses Supabase's built-in Row Level Security (RLS) for access control
- Queries run client-side with full type safety

## Setup Steps

### 1. Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be ready

### 2. Get Your Credentials

1. Go to Project Settings → API
2. Copy your **Project URL** (e.g., `https://xxxxx.supabase.co`)
3. Copy your **anon/public** key (the one labeled "anon public")

### 3. Configure Environment Variables

Create `apps/web/.env` with:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key-here
```

### 4. Create the Database Table

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Run this SQL:

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

-- Create policy to allow all operations (for development)
CREATE POLICY "Allow all operations on todos" ON todos
  FOR ALL
  USING (true)
  WITH CHECK (true);
```

### 5. Start the Dev Server

```bash
pnpm dev
```

### 6. Test It Out

1. Navigate to http://localhost:3001/todos
2. Add some todos
3. Refresh the page - your todos should persist!

## Benefits

✅ **Real persistence** - Data survives server restarts  
✅ **No backend code needed** - Direct client-to-database queries  
✅ **Built-in security** - Row Level Security policies  
✅ **Realtime ready** - Easy to add realtime subscriptions later  
✅ **Scalable** - Supabase handles scaling automatically

## Security Notes

The current RLS policy allows **anyone** to read/write todos. This is fine for development.

For production with authentication, update the RLS policies to check `auth.uid()` and add a `user_id` column to restrict access to each user's own todos.

See `SUPABASE_SETUP.md` for production-ready RLS policies.

## Old Implementation

The old mock implementation is still available in `packages/api/src/routers/todo.mock.ts` if you need to reference it. The Drizzle ORM implementation is in `packages/api/src/routers/todo.ts`.
