import { Link } from "@tanstack/react-router";
import { Group, Anchor, Divider } from "@mantine/core";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/todos", label: "Todos" },
  ] as const;

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
        <Group gap="xs"></Group>
      </Group>
      <Divider />
    </div>
  );
}
