import { createTRPCRouter } from "../init";
import { pitchRouter } from "./pitch";
import { utilsRouter } from "./utils";

export const appRouter = createTRPCRouter({
  pitch: pitchRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
