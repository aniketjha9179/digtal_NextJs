"use client";
import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-creadential-validators";
import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

// schema

// main context
// how to handle form in reactjs

const Page = () => {
  // how to handle form in reactjs
  // we can destructure 3 things
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });
const {mutate, isLoading}=trpc.auth.createPayloadUser.useMutation({
    

})


  // validating credentials
  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({email, password})
  };

  return (
    <>
      <div className=" container relative flex pt-20  flex-col items-center justify-center lg:px-0">
        <div className=" mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className=" flex flex-col items-center space-y-2 text-center ">
            <Icons.logo className="  h-20 w-20" />
            <h1 className=" text-2xl font-bold text-gray-800">
              Create an account
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: " gap-1.5",
              })}
              href={"/sign-in"}
            >
              Already have an account ? Sign-in
              <ArrowRight className=" h4 w-4 " />
            </Link>
          </div>
          {/* sign up forms in react very important */}
          <div className=" grid gap-6 ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className=" grid gap-2">
                <div className=" grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {
                      // bcoz of this we don't need onhange, novalue need
                      ...register("email")
                    }
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                </div>
                {/* password field */}
                <div className=" grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                  
                    {...register("password")}
                    type="password"    
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="password"
                  />
                </div>
                <Button >Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
