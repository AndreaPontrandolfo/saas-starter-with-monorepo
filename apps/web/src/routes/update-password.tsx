import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  Title,
  Loader,
} from "@mantine/core";
import { supabase } from "@/utils/supabase";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/contexts/auth";

export const Route = createFileRoute("/update-password")({
  component: UpdatePasswordComponent,
});

function UpdatePasswordComponent() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in (shouldn't happen if coming from email link, but safety check)
    if (!user) {
      navigate({ to: "/login" });
    }
  }, [user, navigate]);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }

    if (password.length < 6) {
      notifications.show({
        title: "Error",
        message: "Password must be at least 6 characters",
        color: "red",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      notifications.show({
        title: "Success",
        message: "Password updated successfully",
        color: "green",
      });

      navigate({ to: "/todos" });
    } catch (error: unknown) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to update password",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" mb="md">
        Update your password
      </Title>

      <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
        <form onSubmit={handleUpdatePassword}>
          <PasswordInput
            label="New Password"
            placeholder="Your new password"
            required
            radius="md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your new password"
            required
            mt="md"
            radius="md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
          <Button fullWidth mt="xl" radius="md" type="submit" disabled={loading}>
            {loading ? <Loader size="sm" /> : "Update password"}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
