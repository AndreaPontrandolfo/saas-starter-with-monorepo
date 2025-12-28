import { StrictMode } from "react";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import type { QueryClient } from "@tanstack/react-query";

import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

import type { orpc } from "@/utils/orpc";

import Header from "../components/header";
import { MantineProvider, AppShell } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

export interface RouterAppContext {
  orpc: typeof orpc;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "My App",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <StrictMode>
      <MantineProvider defaultColorScheme="dark">
        <Notifications />
        <html lang="en">
          <head>
            <HeadContent />
          </head>
          <body>
            <AppShell header={{ height: "auto" }}>
              <AppShell.Header>
                <Header />
              </AppShell.Header>
              <AppShell.Main>
                <Outlet />
              </AppShell.Main>
            </AppShell>
            <Scripts />
          </body>
        </html>
        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </MantineProvider>
    </StrictMode>
  );
}
