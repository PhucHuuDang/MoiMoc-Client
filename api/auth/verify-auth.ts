"use server";

import { cache } from "react";
import { decryptToken, getTokenCookies } from "../store/cookies-stored";
import { cookies } from "next/headers";

type User = {
  id: number;
  name: string;
  email: string | null;
  role: string;
  password: string;
  phoneAuth: string;
  avatar: string | null;
  designation: string | null;
  createdAt: string;
  updatedAt: string;
};
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
    const token = cookies().get("token")?.value;

    if (!token) {
      console.log("Token not found");
      return { isAuth: false, user: null };
    }

    // console.log({ token });

    const dataDecoded = await decryptToken(token);

    if (!dataDecoded || !dataDecoded.sub) {
      console.log("Invalid token or missing user ID in token");
      return { isAuth: false, user: null };
    }

    const { sub } = dataDecoded;

    // console.log("Authenticated user:", sub);

    return { isAuth: true, user: sub, token };
  } catch (error) {
    console.error("Error during authentication:", error);
    return { isAuth: false, user: null, token: undefined };
  }
});
