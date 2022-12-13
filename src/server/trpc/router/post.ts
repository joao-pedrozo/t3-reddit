import { z } from 'zod';

import { router, publicProcedure, protectedProcedure } from '../trpc';

export const postRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  createPost: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        communityId: z.string().optional(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          community: input.communityId
            ? { connect: { id: input.communityId } }
            : undefined,
        },
      });
    }),
  timeline: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      where: {
        community: {
          members: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      },
    });
  }),
  findPostById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.post.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
