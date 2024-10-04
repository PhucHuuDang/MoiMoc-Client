"use server";

import { decryptToken, getTokenCookies } from "../store/cookies-stored";
import { cookies } from "next/headers";

// export const verifyAuth = async () => {
//   const token = cookies().get("token")?.value!;

//   console.log({ token });

//   const dataDecoded = await decryptToken(token);

//   if (!dataDecoded || !dataDecoded.sub) {
//     console.log("Invalid token or missing user ID in token");
//     return { isAuth: false, user: null };
//   }

//   const { sub } = dataDecoded;
//   console.log(sub);

//   return { isAuth: true, user: sub };
// };

export const verifyAuth = async () => {
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

    return { isAuth: true, user: sub };
  } catch (error) {
    console.error("Error during authentication:", error);
    return { isAuth: false, user: null };
  }
};
