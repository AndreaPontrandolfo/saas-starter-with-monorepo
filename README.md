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

This project uses PostgreSQL with Drizzle ORM.

1. Make sure you have a PostgreSQL database set up.
2. Update your `apps/web/.env` file with your PostgreSQL connection details.

3. Apply the schema to your database:

```bash
pnpm run db:push
```

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

## For Supabase manual setup

1. Ensure Docker is installed and running.
2. Install the Supabase CLI (e.g., `npm install -g supabase`).
3. Run `supabase init` in your project's `packages/db` directory.
4. Run `supabase start` in your project's `packages/db` directory.
5. Copy the 'DB URL' from the output.
6. Add the DB URL to the .env file in `packages/db/.env` as `DATABASE_URL`:
