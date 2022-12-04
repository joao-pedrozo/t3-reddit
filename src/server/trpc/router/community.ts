import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const communityRouter = router({
  getAllCommunities: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.community.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        members: {
          select: {
            id: true,
          },
        },
      },
    });
  }),
  getNonSubscribedCommunities: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.community.findMany({
      where: {
        members: {
          none: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  createCommunity: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(50),
        description: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.community.create({
        data: {
          name: input.name,
          description: input.description,
          members: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          creator: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  subscribeToCommunity: protectedProcedure
    .input(
      z.object({
        communityId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.community.update({
        where: {
          id: input.communityId,
        },
        data: {
          members: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  findCommunityByName: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.community.findFirst({
        where: {
          name: input.name,
        },
        select: {
          id: true,
          name: true,
          description: true,
        },
      });
    }),
  getSubscribedCommunities: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.community.findMany({
      where: {
        members: {
          some: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
});
