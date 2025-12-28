import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  Loader,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/utils/supabase";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/contexts/auth";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      next: (search.next as string) || "/",
    };
  },
});

function LoginComponent() {
  const navigate = useNavigate();
  const { next } = useSearch({ from: "/login" });
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: next });
    }
  }, [user, authLoading, next, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      notifications.show({
        title: "Success",
        message: "Logged in successfully",
        color: "green",
      });

      navigate({ to: next });
    } catch (error: unknown) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to log in",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  // Don't render form if already logged in (will redirect)
  if (authLoading || user) {
    return (
      <Container size={420} my={40}>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Welcome back!
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Do not have an account yet?{" "}
        <Anchor component={Link} to="/sign-up" size="sm">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
        <form onSubmit={handleLogin}>
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
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Group justify="space-between" mt="lg">
            <Anchor
              component={Link}
              to="/forgot-password"
              size="sm"
              c="dimmed"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" radius="md" type="submit" disabled={loading}>
            {loading ? <Loader size="sm" /> : "Sign in"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
