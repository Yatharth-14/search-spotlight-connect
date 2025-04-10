
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoginForm } from "./LoginForm";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LoginModal = ({ open, onOpenChange }: LoginModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Login to your account</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
