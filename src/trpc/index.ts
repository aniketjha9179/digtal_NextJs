import { publicProcedure, router } from "./trpc";

export const appRouter= router({
    // an api endpoint
    anyApiRoute:publicProcedure.query(()=>{
        return 'hello'
    }),

})

export type AppRouter  = typeof appRouter