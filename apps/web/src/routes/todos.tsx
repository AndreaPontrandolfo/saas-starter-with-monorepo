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
import { supabase } from "@/utils/supabase";

export const Route = createFileRoute("/todos")({
  component: TodosRoute,
});

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodosRoute() {
  const [newTodoText, setNewTodoText] = useState("");

  // Fetch todos from Supabase
  const todos = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });
      const { data, error } = response;

      if (error) throw error;
      return data as Todo[];
    },
  });

  // Create todo mutation
  const createMutation = useMutation({
    mutationFn: async (text: string) => {
      const { data, error } = await supabase
        .from("todos")
        .insert([{ text, completed: false }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      todos.refetch();
      setNewTodoText("");
    },
  });

  // Toggle todo mutation
  const toggleMutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: number;
      completed: boolean;
    }) => {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !completed })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      todos.refetch();
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("todos").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      todos.refetch();
    },
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      createMutation.mutate(newTodoText);
    }
  };

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
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
              Manage your tasks efficiently (Powered by Supabase)
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
              <Button
                type="submit"
                disabled={createMutation.isPending || !newTodoText.trim()}
              >
                {createMutation.isPending ? <Loader size="sm" /> : "Add"}
              </Button>
            </Group>
          </form>

          {(() => {
            return todos.isLoading ? (
              <Center py="xl">
                <Loader />
              </Center>
            ) : todos.error ? (
              <Text py="xl" ta="center" c="red">
                Error loading todos: {todos.error.message}
              </Text>
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
                          onChange={() =>
                            handleToggleTodo(todo.id, todo.completed)
                          }
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
            );
          })()}
        </Stack>
      </Card>
    </Center>
  );
}
