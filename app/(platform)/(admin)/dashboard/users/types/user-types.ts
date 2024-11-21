export interface User {
  id: number;
  name: string;
  email: string;
  role: "User" | "Admin";
  status: "Active" | "Inactive";
}

export interface UserActivity {
  user: string;
  action: string;
  time: string;
}

export interface UserStats {
  title: string;
  value: number;
  icon: React.ElementType;
  change: number;
}
