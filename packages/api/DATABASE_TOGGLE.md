# Database Connection Toggle

This API is currently configured to run **without a database connection** using in-memory mock data.

## Current Setup

The application uses a mock implementation of the todo router that stores data in memory. This is perfect for:

- Development without database setup
- Quick prototyping
- Testing the UI/UX
- Demos

**Note:** All data is lost when the server restarts since it's stored in memory.

## Switching Back to Real Database

To re-enable the real database connection, edit `packages/api/src/routers/index.ts`:

### Current (Mock) Configuration:

```typescript
// import { todoRouter } from "./todo";
import { todoRouterMock as todoRouter } from "./todo.mock";
```

### To Re-enable Database:

```typescript
import { todoRouter } from "./todo";
// import { todoRouterMock as todoRouter } from "./todo.mock";
```

Simply uncomment the first import and comment out the second import.

## Files Involved

- **`packages/api/src/routers/index.ts`** - Router configuration (where you toggle)
- **`packages/api/src/routers/todo.mock.ts`** - Mock implementation (in-memory)
- **`packages/api/src/routers/todo.ts`** - Real implementation (database)

## Requirements for Real Database

When switching back to the real database, ensure:

1. `DATABASE_URL` is set in your environment variables
2. Database is running and accessible
3. Migrations have been run
4. `CORS_ORIGIN` is properly configured

See the main README for database setup instructions.
