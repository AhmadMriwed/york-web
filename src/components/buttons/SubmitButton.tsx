import React from "react";
import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={className ?? " bg-primary-color1 hover:bg-hover w-full p-5"}
    >
      {isLoading ? (
        <div className="flex items-center h-32">
          <Loader2Icon className="animate-spin relative" />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
