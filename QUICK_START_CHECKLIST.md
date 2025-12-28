# Supabase Todos - Quick Start Checklist

Use this checklist to get your Supabase-powered todos app running:

## ✅ Setup Checklist

### 1. Supabase Project Setup
- [ ] Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
- [ ] Wait for project initialization to complete
- [ ] Navigate to Settings → API in your Supabase dashboard
- [ ] Copy your **Project URL** (looks like `https://xxxxx.supabase.co`)
- [ ] Copy your **anon public** key (long string of characters)

### 2. Local Environment Configuration
- [ ] Create `apps/web/.env` file in your project
- [ ] Add the following variables:
  ```env
  VITE_SUPABASE_URL=https://your-project-id.supabase.co
  VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-anon-key-here
  ```
- [ ] Replace the placeholder values with your actual credentials

### 3. Database Table Creation
- [ ] Open Supabase dashboard
- [ ] Click on "SQL Editor" in the sidebar
- [ ] Click "New query"
- [ ] Paste the SQL from `SUPABASE_SETUP.md` (or below):

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

- [ ] Click "Run" or press Ctrl+Enter
- [ ] Verify "Success. No rows returned" message

### 4. Verify Table Creation
- [ ] Go to "Table Editor" in Supabase dashboard
- [ ] Look for "todos" table in the list
- [ ] Click on it to see the columns (id, text, completed, created_at)

### 5. Start Development Server
- [ ] Open terminal in your project root
- [ ] Run: `pnpm install` (if you haven't already)
- [ ] Run: `pnpm dev`
- [ ] Wait for server to start

### 6. Test the App
- [ ] Open browser to http://localhost:3001/todos
- [ ] Try adding a new todo
- [ ] Try marking a todo as complete
- [ ] Try deleting a todo
- [ ] Refresh the page - todos should persist!
- [ ] Check Supabase Table Editor to see the data in your database

## 🎉 Success!

If all items are checked and your todos are persisting, you're all set!

## 🔧 Troubleshooting

### "Error loading todos"
- Check that your `.env` variables are correct
- Verify your Supabase project is running (not paused)
- Check browser console for specific error messages

### "Cannot find module" errors
- Run `pnpm install` again
- Restart your dev server

### Empty todos list but no errors
- Check Supabase Table Editor to see if data is actually saving
- Verify RLS policy was created correctly
- Check Network tab in browser DevTools for Supabase API calls

## 📚 Next Steps

Once everything works:
- Read `SUPABASE_SETUP.md` for production RLS policies
- Add authentication (Supabase Auth)
- Add user-specific todos with proper RLS
- Enable realtime subscriptions for live updates

