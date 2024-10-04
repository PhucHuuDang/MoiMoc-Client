import axios from "axios";

type RegisterData = {
  name: string;
  phoneAuth: string;
  password: string;
  confirmPassword: string;
};

export const registerAccount = async (data: RegisterData) => {
  console.log("env variable: ", process.env.NEXT_PUBLIC_API_URL);

  const { confirmPassword, name, phoneAuth, password } = data;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      {
        name,
        phoneAuth,
        password,
      },
    );

    // if (response.status === 200) {
    //   return response.data;
    // }

    console.log(response);

    console.log(response.data);

    if (response.status === 201) {
      return response.data;
    }

    throw new Error("Registration failed");
  } catch (error) {
    console.log({ error });
  }
};
