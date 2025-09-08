import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";
export const createTRPCContext = cache(async ({ req }) => {
  /**
   * @see: https://trpc.io/docs/server/context
   * TODO: Implement proper authentication and extract userId from request.
   */
  return { userId: req?.user?.id };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
