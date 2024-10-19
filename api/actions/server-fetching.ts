"use server";
export const serverFetching = async (
  endpoint: string,
  accessToken?: string,
) => {
  const headers: HeadersInit = {
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PRIVATE_API_URL}${endpoint}`,
      {
        headers,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return response.json();
  } catch (error) {
    console.log({ error });
  }
};
