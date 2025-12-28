// Mock todo router for development without database
import z from "zod";
import { publicProcedure } from "../index";

// In-memory storage for mock todos
let mockTodos: Array<{
  id: number;
  text: string;
  completed: boolean;
}> = [
  { id: 1, text: "Sample todo 1", completed: false },
  { id: 2, text: "Sample todo 2", completed: true },
];

let nextId = 3;

export const todoRouterMock = {
  getAll: publicProcedure.handler(async () => {
    return mockTodos;
  }),

  create: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .handler(async ({ input }) => {
      const newTodo = {
        id: nextId++,
        text: input.text,
        completed: false,
      };
      mockTodos.push(newTodo);
      return newTodo;
    }),

  toggle: publicProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .handler(async ({ input }) => {
      const todo = mockTodos.find((t) => t.id === input.id);
      if (todo) {
        todo.completed = input.completed;
      }
      return todo;
    }),

  delete: publicProcedure.input(z.object({ id: z.number() })).handler(async ({ input }) => {
    mockTodos = mockTodos.filter((t) => t.id !== input.id);
    return { success: true };
  }),
};

