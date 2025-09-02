"use client";

import { useActionState, useState } from "react";
import Form from "next/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  AtSign,
  CircleAlert,
  LockKeyhole,
  Shirt,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { registerEmailAction } from "@/lib/actions/authActions";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";

export default function RegisterForm() {


    const [isPending, setIsPending] = useState(false);
    const router = useRouter();
  
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
      evt.preventDefault();
  
      setIsPending(true);
  
      const formData = new FormData(evt.currentTarget);
      const { error } = await registerEmailAction(formData);

  if (error) {
    toast.error(error);
    setIsPending(false);
  } else {
    toast.success("Registration complete. You're all set.");
    router.push("/auth/register/success");
  }
 
    }


    async function handleClick() {
      setIsPending(true);
  
      await signIn.social({
        provider: "google",
        callbackURL: "/profile",
        errorCallbackURL: "/auth/login/error",
      });
  
      setIsPending(false);
    }


  return (
    <div  className="w-full max-w-md mx-auto space-y-6">
      <form  onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="redirectTo" value="/dashboard" />
        <div className="rounded-lg border-2 border-zinc-800 bg-white/95 p-8 shadow-lg">
          <div className="flex justify-center mb-6">
            <Shirt className="h-8 w-8 text-zinc-800" />
          </div>
          <h1 className="mb-5 text-2xl font-bold text-center text-zinc-800">
            Create your account
          </h1>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-800" htmlFor="name">
              Full Name
            </label>
            <div className="relative">
              <input
                className="flex h-10 w-full rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-sm pl-10 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-950"
                id="name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
              <User className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-800"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="flex h-10 w-full rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-sm pl-10 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-950"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSign className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-800"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="flex h-10 w-full rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-sm pl-10 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-950"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-zinc-800"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="flex h-10 w-full rounded-md border-2 border-zinc-300 bg-white px-3 py-2 text-sm pl-10 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-800 dark:border-zinc-700 dark:bg-zinc-950"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
              />
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-zinc-500" />
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold"
              disabled={isPending}
            >
              Register <ArrowRightIcon className="ml-auto h-5 w-5" />
            </Button>
          </div>

          <div
            className="flex h-8 items-end space-x-1 mt-4"
            aria-live="polite"
            aria-atomic="true"
          >
           
          </div>
        </div>
      </form>

      <div className="text-center text-sm text-zinc-600">
        <p>Or sign up with</p>
      </div>

      <div className="grid w-full grid-cols-1 items-center gap-2">
        <div className="grid grid-cols-1 gap-x-2">
         
            <Button
              className="w-full border-2 border-zinc-300 hover:border-zinc-800 bg-white text-zinc-800"
              type="submit"
              size="lg"
              variant="outline"
              disabled={isPending}
              onClick={handleClick}
            >
             
              Sign up with Google
            </Button>
         
        </div>
        <Link href="/login/magic-link">
          <Button
            className="w-full bg-zinc-200 hover:bg-zinc-300 text-zinc-800"
            size="lg"
            variant="secondary"
            disabled={isPending}
          >
            Login with magic link
          </Button>
        </Link>
      </div>

      <div className="text-center text-sm">
        <span className="text-zinc-600">Already have an account?</span>{" "}
        <Link
          href="/auth/login"
          className="text-zinc-800 font-medium hover:underline"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}