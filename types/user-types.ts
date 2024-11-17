export type UserProfile = {
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    website: string | null;
    bio: string | null;
    designation: string | null;
    phoneAuth: string;
    createdAt: string; // Use Date if parsing to Date objects
    updatedAt: string; // Use Date if parsing to Date objects
  };
  phones: Array<{
    id: number;
    phone: string;
    createdAt: string; // Use Date if parsing to Date objects
    updatedAt: string; // Use Date if parsing to Date objects
    userId: number;
  }>;
  address: Array<{
    id: number;
    address: string;
    createdAat: string; // Note: Typo in "createdAt" key (correct if it's consistent in your data)
    updatedAat: string; // Note: Typo in "updatedAt" key (correct if it's consistent in your data)
    userId: number;
  }>;
  activities: Array<{
    id: number;
    activity: string;
    userId: number;
    createdAt: string; // Use Date if parsing to Date objects
    updatedAt: string; // Use Date if parsing to Date objects
  }>;
};
