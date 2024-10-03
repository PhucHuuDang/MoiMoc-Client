"use server";

import { cookies } from "next/headers";

export const storeTokenCookies = async (
  token: string,
  refreshToken: string,
) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  const cookieStore = cookies();

  cookieStore.set("token", token, options);
  cookieStore.set("refreshToken", refreshToken, options);
};

export const deleteTokenCookies = async () => {
  const cookieStore = cookies();

  cookieStore.delete("token");
  cookieStore.delete("refreshToken");
};

export const getTokenCookies = async () => {
  const cookieStore = cookies();

  return {
    token: cookieStore.get("token"),
    refreshToken: cookieStore.get("refreshToken"),
  };
};

export const decryptToken = async (token: string | undefined) => {};
