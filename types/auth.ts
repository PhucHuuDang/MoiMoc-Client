export type User = {
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

export const isUserWithRole = (user: unknown): user is User => {
  return (
    user !== null &&
    typeof user === "object" &&
    "role" in user &&
    typeof (user as any).role === "string"
  );
};
