import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Paper, Stack, Group, Text, Indicator, Code } from "@mantine/core";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());

  return (
    <Container size="md" py="xs" px="md">
      <Code block p="xs">
        Demo
      </Code>
      <Stack gap="lg" mt="md">
        <Paper p="md" withBorder>
          <Stack gap="xs">
            <Text fw={500}>API Status</Text>
            <Group gap="xs">
              <Indicator
                color={healthCheck.data ? "green" : "red"}
                processing={healthCheck.isLoading}
                size={8}
              />
              <Text size="sm" c="dimmed">
                {healthCheck.isLoading
                  ? "Checking..."
                  : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
              </Text>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
