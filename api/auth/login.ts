import axios from "axios";

type LoginData = {
  phone: string;
  password: string;
};

export const login = async (data: LoginData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        data,
      },
    );

    // if (response.status === 200) {
    //   return response.data;
    // }

    return response.data;
  } catch (error) {
    console.log({ error });
  }
};
