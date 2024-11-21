import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "../types/user-types";

interface DeleteUserDialogProps {
  user: User;
  onClose: () => void;
  onDelete: (userId: number) => void;
}

export function DeleteUserDialog({
  user,
  onClose,
  onDelete,
}: DeleteUserDialogProps) {
  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4 py-4">
          <Avatar className="w-16 h-16">
            <AvatarImage
              // src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`}
              src="/about-moi-moc-images/avatar-placeholder.gif"
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <DialogDescription>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
