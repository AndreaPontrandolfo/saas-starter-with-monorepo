# saas-starter-with-monorepo

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, TanStack Start, Self, ORPC, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - SSR framework with TanStack Router
- **React Native** - Build mobile apps using React
- **Expo** - Tools for React Native development
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

## Database Setup

This project uses Supabase for the database with client-side queries.

### Quick Start with Supabase

1. Create a Supabase project at [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Set up your environment variables in `apps/web/.env`:

```sh
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-default-key-here
```

3. Run the SQL from `SUPABASE_SETUP.md` in your Supabase SQL Editor to create the `todos` table

4. Start the dev server:

```bash
pnpm run dev
```

That's it! Your todos will now persist in Supabase.

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to see your fullstack application.
Use the Expo Go app to run the mobile application.

For OpenAPI (Scalar UI), open [http://localhost:3001/api/rpc/api-reference](http://localhost:3001/api/rpc/api-reference) in your browser to see the API reference.

## Project Structure

```
saas-starter-with-monorepo/
├── apps/
│   └── web/         # Fullstack application (React + TanStack Start)
│   ├── native/      # Mobile application (React Native, Expo)
├── packages/
│   ├── api/         # API layer / business logic
│   └── db/          # Database schema & queries
```

## Available Scripts

- `pnpm run dev`: Start all applications in development mode
- `pnpm run build`: Build all applications
- `pnpm run check-types`: Check TypeScript types across all apps
- `pnpm run dev:native`: Start the React Native/Expo development server
- `pnpm run db:push`: Push schema changes to database
- `pnpm run db:studio`: Open database studio UI

## Troubleshooting

For Expo connectivity issues, update `apps/native/.env` with your local IP address:

```sh
EXPO_PUBLIC_SERVER_URL=http://<YOUR_LOCAL_IP>:3001
```

## Supabase Setup

### Production Environment

To use Supabase in production, you need to configure the following environment variables for the web app:

**Required environment variables:**

- `VITE_SUPABASE_URL` - Your Supabase project URL (e.g., `https://your-project.supabase.co`)
- `VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY` - Your Supabase publishable default key

**Where to set these:**

- **Local development**: Create a `.env` file in `apps/web/` directory with:
  ```sh
  VITE_SUPABASE_URL=https://your-project.supabase.co
  VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-default-key-here
  ```
- **Production deployment**: Set these as environment variables in your hosting provider's dashboard (Vercel, Netlify, Cloudflare Pages, etc.)

**Security Note:** The anon key is safe to expose in client-side code. Make sure Row Level Security (RLS) is enabled on your Supabase tables to protect your data.

**Using the Supabase client:**
Import the pre-configured Supabase client in your web app:

```typescript
import { supabase } from "./utils/supabase";
```

### Local Supabase Setup (Optional)

For local development with Supabase CLI:

1. Ensure Docker is installed and running.
2. Install the Supabase CLI (e.g., `npm install -g supabase`).
3. Run `supabase init` in your project's `packages/db` directory.
4. Run `supabase start` in your project's `packages/db` directory.
5. Copy the 'DB URL' from the output.
6. Add the DB URL to the .env file in `packages/db/.env` as `DATABASE_URL`:
