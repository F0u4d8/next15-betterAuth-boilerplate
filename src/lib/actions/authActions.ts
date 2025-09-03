"use server";

import { auth, type ErrorCode } from "@/lib/auth";
import { headers } from "next/headers";
import { APIError } from "better-auth/api";
import { redirect } from "next/navigation";
import { prisma } from "../db";
import { revalidatePath } from "next/cache";



export async function signInEmailAction(formData: FormData) {
  const email = String(formData.get("email"));
  if (!email) return { error: "Please enter your email" };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter your password" };

  try {
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email,
        password,
      },
    });
    return { error: null };
  } catch (err) {
    console.log(err);
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      console.dir(err, { depth: 5 });
      switch (errCode) {
        case "EMAIL_NOT_VERIFIED":
          redirect("/auth/verify?error=email_not_verified");
        default:
          return { error: err.message };
      }
    }

    return { error: "Internal Server Error" };
  }
}





export async function registerEmailAction(formData: FormData) {
    const name = String(formData.get("name"));
    if (!name) return { error: "Please enter your name" };
  
    const email = String(formData.get("email"));
    if (!email) return { error: "Please enter your email" };
  
    const password = String(formData.get("password"));
    if (!password) return { error: "Please enter your password" };

    const confirmPassword = String(formData.get("confirmPassword"));
    if (!confirmPassword) return { error: "Please enter your confirm password" };

    if (password !== confirmPassword) return { error: "Passwords do not match" };
  
    try {
      await auth.api.signUpEmail({
        body: {
          name,
          email,
          password,
        },
      });
  
      return { error: null };
    } catch (err) {
        console.log(err);
      if (err instanceof APIError) {
        const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
  
        switch (errCode) {
          case "USER_ALREADY_EXISTS":
            return { error: "Oops! Something went wrong. Please try again. " };
          default:
            return { error: err.message };
        }
      }
  
      return { error: "Internal Server Error Please try again." };
    }
  }




  export async function deleteUserAction({ userId }: { userId: string }) {
    const headersList = await headers();
  
    const session = await auth.api.getSession({
      headers: headersList,
    });
  
    if (!session) throw new Error("Unauthorized");
  
    if (session.user.role !== "ADMIN" || session.user.id === userId) {
      throw new Error("Forbidden");
    }
  
    try {
      await prisma.user.delete({
        where: {
          id: userId,
          role: "USER",
        },
      });
  
      if (session.user.id === userId) {
        await auth.api.signOut({ headers: headersList });
        redirect("/auth/sign-in");
      }
  
      revalidatePath("/dashboard/admin");
      return { success: true, error: null };
    } catch (err) {
      if (err instanceof APIError) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Internal Server Error" };
    }
  }
