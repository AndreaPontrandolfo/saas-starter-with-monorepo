import { Link, useNavigate } from "@tanstack/react-router";
import { Group, Anchor, Divider, Button, Text } from "@mantine/core";
import { useAuth } from "@/contexts/auth";

export default function Header() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Home" },
    { to: "/todos", label: "Todos" },
  ] as const;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div>
      <Group justify="space-between" px="xs" py="xs">
        <Group gap="md">
          {links.map(({ to, label }) => {
            return (
              <Anchor
                key={to}
                component={Link}
                to={to}
                size="lg"
                style={{ textDecoration: "none" }}
              >
                {label}
              </Anchor>
            );
          })}
        </Group>
        <Group gap="xs">
          {loading ? (
            <Text size="sm" c="dimmed">
              Loading...
            </Text>
          ) : user ? (
            <>
              <Text size="sm" c="dimmed">
                {user.email}
              </Text>
              <Button variant="light" size="xs" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Anchor component={Link} to="/login" size="sm">
                Login
              </Anchor>
              <Button component={Link} to="/sign-up" variant="light" size="xs">
                Sign up
              </Button>
            </>
          )}
        </Group>
      </Group>
      <Divider />
    </div>
  );
}
