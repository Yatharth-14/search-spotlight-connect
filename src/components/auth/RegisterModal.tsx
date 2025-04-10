
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RegisterForm } from "./RegisterForm";

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RegisterModal = ({ open, onOpenChange }: RegisterModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Create an Account</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <RegisterForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};
