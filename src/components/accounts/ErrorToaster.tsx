'use client';
import { useEffect } from "react";
import { Message, useToaster } from "rsuite";

export const ErrorToaster = ({ error }: { error: string }) => {
  const toaster = useToaster();

  useEffect(() => {
    if (error) {
      toaster.push(
        <Message showIcon type="error" closable className="text-[16px]">
          {error}
        </Message>,
        { placement: "bottomStart", duration: 7000 }
      );
    }
  }, [error, toaster]);

  return null;
};