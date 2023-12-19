import { getPayLoadClient } from "../get-payload";
import { AuthCredentialsValidator } from "../lib/validators/account-creadential-validators";
import { publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";

export const authRouter = router({
  // creating a user
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input;
      const payload = await getPayLoadClient();
      // check if user already exists
      const { docs: users } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (users.length !== 0)
        throw new TRPCError({
          code: "CONFLICT",
        });
        // creating  a new user
        await payload.create({
            collection:'users',
            data:{},
            

        })
    }),
});
