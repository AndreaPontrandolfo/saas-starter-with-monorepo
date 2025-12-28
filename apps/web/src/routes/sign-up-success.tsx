import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  Button,
  Container,
  Paper,
  Text,
  Title,
} from "@mantine/core";

export const Route = createFileRoute("/sign-up-success")({
  component: SignUpSuccessComponent,
});

function SignUpSuccessComponent() {
  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Check your email
      </Title>

      <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
        <Text size="sm" c="dimmed" mb="lg">
          We've sent you a confirmation email. Please check your inbox and
          click the confirmation link to activate your account.
        </Text>

        <Button
          component={Link}
          to="/login"
          fullWidth
          radius="md"
          variant="light"
        >
          Back to login
        </Button>
      </Paper>
    </Container>
  );
}
