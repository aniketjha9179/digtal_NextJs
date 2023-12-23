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
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ZodError } from "zod";

// schema

// main context
// how to handle form in reactjs

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");

  const continueAsSeller=()=>{
    router.push('?as=seller')
  }
  const continueAsBuyer=()=>{
    router.replace('/sign-in', undefined)
  }
  // how to handle form in reactjs
  // we can destructure 3 things
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: () => {
      toast.success("Signed in successfully");
      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }
      if (isSeller) {
        router.push(`/sell`);
        return;
      }
      router.push("/");
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Invalid email or password.");
      }
    },
  });

  // validating credentials
  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({ email, password });
  };

  return (
    <>
      <div className=" container relative flex pt-20  flex-col items-center justify-center lg:px-0">
        <div className=" mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className=" flex flex-col items-center space-y-2 text-center ">
            <Icons.logo className="  h-20 w-20" />
            <h1 className=" text-2xl font-bold text-gray-800">
              Sign in to your account
            </h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: " gap-1.5",
              })}
              href={"/sign-up"}
            >
              Don&apos;t have an account ?
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
                  {errors?.email && (
                    <p className=" text-sm text-red-500">
                      {errors.email.message}{" "}
                    </p>
                  )}
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
                  {errors?.password && (
                    <p className=" text-sm text-red-500">
                      {errors.password.message}{" "}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>
            {/*  */}
            <div className=" relative ">
              <div
                aria-hidden="true"
                className=" absolute inset-0 flex items-center "
              >
                <span className="  w-full border-t" />
              </div>
              <div className=" relative flex justify-center  text-xs uppercase">
                <span className=" bg-background  text-muted-foreground px2 ">
                  or
                </span>
              </div>
            </div>
            {isSeller ? (
              <Button variant={'secondary'} 
              disabled={isLoading}
              onClick={continueAsBuyer}>Continue as customer</Button>
            ) : (
              <Button 
              variant={'secondary'} 
              disabled={isLoading}
              onClick={continueAsSeller}
              
              >Continue as seller</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
