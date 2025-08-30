import { createTRPCRouter } from "../init";
import { pitchRouter } from "./pitch";
import { requestAssistanceRouter } from "./request-assistance";
import { utilsRouter } from "./utils";

export const appRouter = createTRPCRouter({
  pitch: pitchRouter,
  requestAssistance: requestAssistanceRouter,
  utils: utilsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
