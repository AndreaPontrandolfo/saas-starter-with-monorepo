import type { RouterClient } from "@orpc/server";

import { publicProcedure } from "../index";
// Toggle between real and mock database implementations
// To re-enable database: uncomment the next line and comment out the mock import
// import { todoRouter } from "./todo";
import { todoRouterMock as todoRouter } from "./todo.mock";

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK";
  }),
  todo: todoRouter,
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
