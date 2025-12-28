import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { Container, Loader, Text, Title } from "@mantine/core";
import { supabase } from "@/utils/supabase";
import { notifications } from "@mantine/notifications";

export const Route = createFileRoute("/auth/confirm")({
  component: ConfirmComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      token_hash: search.token_hash as string | undefined,
      type: search.type as string | undefined,
      next: (search.next as string) || "/",
    };
  },
});

function ConfirmComponent() {
  const navigate = useNavigate();
  const { token_hash, type, next } = useSearch({ from: "/auth/confirm" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleConfirm = async () => {
      if (!token_hash) {
        setError("Missing token hash");
        setLoading(false);
        return;
      }

      try {
        // Verify the OTP token
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash,
          type: (type as "email" | "recovery" | "magiclink" | "signup") || "email",
        });

        if (verifyError) throw verifyError;

        notifications.show({
          title: "Success",
          message:
            type === "recovery"
              ? "Password reset confirmed"
              : "Email confirmed successfully",
          color: "green",
        });

        // Redirect based on type
        if (type === "recovery") {
          navigate({ to: "/update-password" });
        } else {
          navigate({ to: next });
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to confirm";
        setError(errorMessage);
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
        setLoading(false);
      }
    };

    handleConfirm();
  }, [token_hash, type, next, navigate]);

  if (loading) {
    return (
      <Container size={420} my={40}>
        <Title ta="center" mb="md">
          Confirming...
        </Title>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size={420} my={40}>
        <Title ta="center" mb="md" c="red">
          Confirmation failed
        </Title>
        <Text c="dimmed" ta="center">
          {error}
        </Text>
      </Container>
    );
  }

  return null;
}
