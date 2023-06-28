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
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.title}`
      }
    }),

  createTodo: publicProcedure
    .input(z.object({ id: z.string().optional(), title: z.string(), detail: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const todo = await ctx.prisma.todo.create({
        data: {
          id: input.id,
          title: input.title,
          detail: input.detail
        }
      })

      return todo;
    }),

  getTodo: publicProcedure
    // .input(z.object({ title: z.string(), detail: z.string() }))
    // .input(z.object())
    .query(({ ctx }) => {
      return ctx.prisma.todo.findMany()
    }),

  deleteTodo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.todo.delete({
        where: {
          id: input.id
        }
      })
    }),

  getDetail: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
    }),

  updateTodo: publicProcedure
    .input(z.object({}))
    .mutation(async ({ input, ctx }) => {
    }),
})
