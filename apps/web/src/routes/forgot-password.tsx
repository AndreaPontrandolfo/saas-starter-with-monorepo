import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Anchor,
  Button,
  Container,
  Paper,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { supabase } from "@/utils/supabase";
import { notifications } from "@mantine/notifications";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordComponent,
});

function ForgotPasswordComponent() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/auth/confirm?type=recovery&next=/update-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) throw error;

      setSuccess(true);
      notifications.show({
        title: "Success",
        message: "Password reset email sent",
        color: "green",
      });
    } catch (error: unknown) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to send reset email",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Container size={420} my={40}>
        <Title ta="center" mb="md">
          Check your email
        </Title>

        <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
          <Text size="sm" c="dimmed" mb="lg">
            If you registered using your email and password, you will receive a
            password reset email.
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

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Reset your password
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Type in your email and we&apos;ll send you a link to reset your password
      </Text>

      <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
        <form onSubmit={handleForgotPassword}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            radius="md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            disabled={loading}
          />
          <Button fullWidth mt="xl" radius="md" type="submit" disabled={loading}>
            {loading ? <Loader size="sm" /> : "Send reset email"}
          </Button>
        </form>

        <Text size="sm" ta="center" mt="md" c="dimmed">
          Already have an account?{" "}
          <Anchor component={Link} to="/login" size="sm">
            Login
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
