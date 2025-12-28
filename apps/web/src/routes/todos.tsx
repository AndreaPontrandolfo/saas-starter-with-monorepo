import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import {
  Button,
  Card,
  TextInput,
  Checkbox,
  Stack,
  Group,
  Text,
  Loader,
  Center,
  Paper,
  ActionIcon,
} from "@mantine/core";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/todos")({
  component: TodosRoute,
});

function TodosRoute() {
  const [newTodoText, setNewTodoText] = useState("");

  const todos = useQuery(orpc.todo.getAll.queryOptions());
  const createMutation = useMutation(
    orpc.todo.create.mutationOptions({
      onSuccess: () => {
        todos.refetch();
        setNewTodoText("");
      },
    }),
  );
  const toggleMutation = useMutation(
    orpc.todo.toggle.mutationOptions({
      onSuccess: () => {
        todos.refetch();
      },
    }),
  );
  const deleteMutation = useMutation(
    orpc.todo.delete.mutationOptions({
      onSuccess: () => {
        todos.refetch();
      },
    }),
  );

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      createMutation.mutate({ text: newTodoText });
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
  };

  return (
    <Center py="xl">
      <Card w="100%" maw={500} p="md">
        <Stack gap="md">
          <div>
            <Text size="lg" fw={500}>
              Todo List
            </Text>
            <Text size="sm" c="dimmed">
              Manage your tasks efficiently
            </Text>
          </div>

          <form onSubmit={handleAddTodo}>
            <Group gap="xs">
              <TextInput
                style={{ flex: 1 }}
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a new task..."
                disabled={createMutation.isPending}
              />
              <Button type="submit" disabled={createMutation.isPending || !newTodoText.trim()}>
                {createMutation.isPending ? <Loader size="sm" /> : "Add"}
              </Button>
            </Group>
          </form>

          {todos.isLoading ? (
            <Center py="xl">
              <Loader />
            </Center>
          ) : todos.data?.length === 0 ? (
            <Text py="xl" ta="center" c="dimmed">
              No todos yet. Add one above!
            </Text>
          ) : (
            <Stack gap="xs">
              {todos.data?.map((todo) => (
                <Paper key={todo.id} p="sm" withBorder>
                  <Group justify="space-between">
                    <Group gap="xs">
                      <Checkbox
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(todo.id, todo.completed)}
                        id={`todo-${todo.id}`}
                      />
                      <Text
                        component="label"
                        htmlFor={`todo-${todo.id}`}
                        td={todo.completed ? "line-through" : "none"}
                        style={{ cursor: "pointer" }}
                      >
                        {todo.text}
                      </Text>
                    </Group>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDeleteTodo(todo.id)}
                      aria-label="Delete todo"
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>
    </Center>
  );
}
