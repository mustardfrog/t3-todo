import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

export const todoRouter = createTRPCRouter({
  // createTodo, listTodo, deleTodo, updateTodo
  hello: publicProcedure
  .input(z.object({ title: z.string() }))
  .query(( { input }) => {
    return {
      greeting: `Hello ${input.title}`
    }
  })
})
