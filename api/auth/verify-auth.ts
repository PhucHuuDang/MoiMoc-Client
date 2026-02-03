// "use server";

import { cache } from "react";
import { decryptToken } from "../store/cookies-stored";
import { cookies } from "next/headers";
import { User } from "@/types/auth";

export const isUserWithRole = (user: any): user is User => {
  return (
    user !== null &&
    typeof user === "object" &&
    "role" in user &&
    typeof user.role === "string"
  );
};

export const verifyAuth = cache(async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { isAuth: false, user: null };
    }

    const dataDecoded = await decryptToken(token);

    if (!dataDecoded || !dataDecoded.sub) {
      return { isAuth: false, user: null };
    }

    const user = dataDecoded.sub;

    return { isAuth: true, user, token };
  } catch (error) {
    // Don't log expected build-time errors when Next.js attempts static generation
    // These routes will automatically be marked as dynamic
    if (
      process.env.NODE_ENV === "development" &&
      error instanceof Error &&
      !error.message.includes("Dynamic server usage")
    ) {
      console.error("Error during authentication:", error);
    }
    return { isAuth: false, user: null, token: undefined };
  }
});
