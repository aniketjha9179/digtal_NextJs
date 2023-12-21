"use client";

import { trpc } from "@/trpc/client";
import { Loader, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
  token: string;
}
const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token,
  });
  if (isError) {
    return (
      <div className=" flex flex-col items-center gap-2 ">
        <XCircle className=" h8 w-8 text-red-600" />
        <h3 className=" font-semibold text-xl ">There is problem</h3>
        <p className=" text-muted-foreground text-sm">
          This token is not valid or might be expired. please try again.
        </p>
      </div>
    );
  }
  if (data?.success) {
    return (
      <div className=" flex hf flex-col items-center justify-center ">
        <div className=" relative mb-4 h-60 w-60  text-muted-foreground ">
          <Image
            src="/hippo-email-sent.png"
            width={500}
            height={500}
            alt=" the email was sent "
          />
        </div>
        <h3 className=" font-semibold text-2xl "> You &apos;re all set !</h3>
        <p className=" text-muted-foreground text-center mt-1">
          Thank you for verifying your email.
        </p>
        <Link
          href={"/sign-in"}
          className={buttonVariants({
            className: " mt-4 ",
          })}
        >
          Sign in
        </Link>
      </div>
    );
  }
  if(isLoading){
    return (
        <div className=" flex flex-col items-center gap-2 ">
        <Loader className=" animate-spin h8 w-8 text-zinc-500" />
        <h3 className=" font-semibold text-xl ">Verifying... </h3>
        <p className=" text-muted-foreground text-sm">
          This won&apos;t take long.
        </p>
      </div>
    )
  }
};
export default VerifyEmail;
