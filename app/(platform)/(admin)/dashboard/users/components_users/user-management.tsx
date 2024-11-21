"use client";

import { useState } from "react";
import { UserTable } from "./user-table";
// import { AddUserForm } from "./add-user-form";
import { EditUserDialog } from "./edit-user-dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "../types/user-types";
import { DeleteUserDialog } from "./delete-user";

const initialUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 10,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 11,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Admin",
    status: "Inactive",
  },
];

interface UserManagementProps {
  initialTab?: "all-users" | "add-user";
}

export function UserManagement({
  initialTab = "all-users",
}: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "User" | "Admin">("All");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const addUser = (user: Omit<User, "id" | "status">) => {
    setUsers([...users, { ...user, id: users.length + 1, status: "Active" }]);
  };

  const updateUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setEditingUser(null);
  };

  const deleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
    setDeletingUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (roleFilter === "All" || user.role === roleFilter) &&
      (statusFilter === "All" || user.status === statusFilter),
  );

  return (
    <div className="space-y-4">
      {initialTab === "all-users" && (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="sm:w-1/3"
            />
            <Select
              value={roleFilter}
              onValueChange={(value: "All" | "User" | "Admin") =>
                setRoleFilter(value)
              }
            >
              <SelectTrigger className="sm:w-1/3">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                <SelectItem value="User">User</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value: "All" | "Active" | "Inactive") =>
                setStatusFilter(value)
              }
            >
              <SelectTrigger className="sm:w-1/3">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <UserTable
            users={filteredUsers}
            onEdit={setEditingUser}
            onDelete={setDeletingUser}
          />
        </>
      )}
      {/* {initialTab === "add-user" && <AddUserForm onAddUser={addUser} />}
      {editingUser && (
        <EditUserDialog
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onUpdate={updateUser}
        />
      )}
      {deletingUser && (
        <DeleteUserDialog
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onDelete={deleteUser}
        />
      )} */}
    </div>
  );
}
