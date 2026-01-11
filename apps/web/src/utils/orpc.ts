import type { RouterClient } from "@orpc/server";

import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createRouterClient } from "@orpc/server";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { createContext } from "@saas-starter-with-monorepo/api/context";
import { appRouter } from "@saas-starter-with-monorepo/api/routers/index";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { notifications } from "@mantine/notifications";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
        withCloseButton: true,
        autoClose: 5000,
      });
    },
  }),
});

const getORPCClient = createIsomorphicFn()
  .server(() =>
    createRouterClient(appRouter, {
      context: async ({ req }) => {
        return createContext({ req });
      },
    }),
  )
  .client((): RouterClient<typeof appRouter> => {
    const link = new RPCLink({
      url: `${window.location.origin}/api/rpc`,
    });

    return createORPCClient(link);
  });

export const client: RouterClient<typeof appRouter> = getORPCClient();

export const orpc = createTanstackQueryUtils(client);
