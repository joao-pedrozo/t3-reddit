import { router } from '../trpc';
import { authRouter } from './auth';
import { exampleRouter } from './example';
import { postRouter } from './post';
import { communityRouter } from './community';

export const appRouter = router({
  example: exampleRouter,
  post: postRouter,
  community: communityRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
