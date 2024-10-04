"use server";

import { cookies } from "next/headers";

import jwt from "jsonwebtoken";

export const storeTokenCookies = async (
  token: string,
  refreshToken: string,
) => {
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
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

export const decryptToken = async (token: string | undefined) => {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    return decoded;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

// {
//   "userId": 58,
//   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjU4LCJuYW1lIjoiZGV2ZWxvcGVyIiwiZW1haWwiOm51bGwsInJvbGUiOiJNRU1CRVIiLCJwYXNzd29yZCI6IiQyYiQxMCR1Z1dMN0JmeTVzeW94TjhnU1d6TWJPbkNxTVBpalBNZDJQUG5YZ21UeXpHd2ZENWRrdU5GcSIsInBob25lQXV0aCI6IjA4MTQ1OTM3MzYiLCJhdmF0YXIiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDktMzAgMTY6MTA6NDIuMDk3MzI3IiwidXBkYXRlZEF0IjoiMjAyNC0wOS0zMCAxNjoxMDo0Mi4wOTczMjcifSwiaWF0IjoxNzI4MDM0MzM1LCJleHAiOjE3MjgxMjA3MzV9.4qhllx63vu0xDr6hCoqoYxnU583Mo__55vmUa4J-xkU",
//   "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjU4LCJuYW1lIjoiZGV2ZWxvcGVyIiwiZW1haWwiOm51bGwsInJvbGUiOiJNRU1CRVIiLCJwYXNzd29yZCI6IiQyYiQxMCR1Z1dMN0JmeTVzeW94TjhnU1d6TWJPbkNxTVBpalBNZDJQUG5YZ21UeXpHd2ZENWRrdU5GcSIsInBob25lQXV0aCI6IjA4MTQ1OTM3MzYiLCJhdmF0YXIiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjQtMDktMzAgMTY6MTA6NDIuMDk3MzI3IiwidXBkYXRlZEF0IjoiMjAyNC0wOS0zMCAxNjoxMDo0Mi4wOTczMjcifSwiaWF0IjoxNzI4MDM0MzM1LCJleHAiOjE3Mjg2MzkxMzV9.dcYta-F4RYCeYrNgAEIdUh42xH46VTlCYBFMZ0wj5RQ"
// }
