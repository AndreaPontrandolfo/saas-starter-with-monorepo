import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Anchor,
  Button,
  Container,
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

export const Route = createFileRoute("/sign-up")({
  component: SignUpComponent,
});

function SignUpComponent() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: "/" });
    }
  }, [user, authLoading, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectTo = `${window.location.origin}/auth/confirm`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) throw error;

      notifications.show({
        title: "Success",
        message: "Please check your email to confirm your account",
        color: "green",
      });

      navigate({ to: "/sign-up-success" });
    } catch (error: unknown) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to sign up",
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
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        >
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Create account
      </Title>

      <Text c="dimmed" size="sm" ta="center" mt={5} mb={30}>
        Already have an account?{" "}
        <Anchor component={Link} to="/login" size="sm">
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
        <form onSubmit={handleSignUp}>
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
          <Button
            fullWidth
            mt="xl"
            radius="md"
            type="submit"
            disabled={loading}
          >
            {loading ? <Loader size="sm" /> : "Sign up"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
