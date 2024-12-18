"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchForm } from "./forms/SearchForm";
import NewConversationForm from "./forms/NewConversationForm";

export function Conversation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isNewConversation, setIsNewConversation] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed z-20 bottom-10 right-10 h-16 w-16 rounded-full bg-primary-color1 hover:bg-primary-color2"
        >
          {isOpen ? (
            <Image
              src="/icons/close-white.svg"
              alt="close conversation"
              height={24}
              width={24}
            />
          ) : (
            <Image
              src="/icons/conversation.svg"
              alt="open conversation"
              height={32}
              width={32}
            />
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[21rem] h-[63vh] m-4 p-0 rounded-lg overflow-hidden">
        <div className="relative h-full transition-all duration-500 ease-in-out">
          {/* Help Center Section */}
          <div
            className={`absolute inset-0 transform ${
              isNewConversation
                ? "-translate-x-full opacity-0"
                : "translate-x-0 opacity-100"
            } transition-all duration-500 ease-in-out`}
          >
            <div className="px-4 pt-8 pb-12 bg-primary-color1 rounded-t-lg">
              <p className="text-base text-white leading-7 mb-4">
                Do you need help? Find the answers in the help center or contact
                us:
              </p>
            </div>
            <SearchForm placeholder="Find Answer" />
            <Button
              onClick={() => setIsNewConversation(true)}
              className=" flex items-center justify-center ml-14 w-[70%] text-lg p-4 bg-primary-color1 hover:bg-primary-color2 mt-4"
            >
              <Image
                src={"/icons/send.svg"}
                height={24}
                width={24}
                alt="send"
              />
              <p>New Conversation</p>
            </Button>
          </div>

          {/* New Conversation Section */}
          <div
            className={`absolute inset-0 transform ${
              isNewConversation
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            } transition-all duration-500 ease-in-out  flex flex-col items-center `}
          >
            <div className="px-4 pt-8 w-full top-0 pb-12 bg-primary-color1 rounded-t-lg">
              <Button
                onClick={() => setIsNewConversation(false)}
                variant={"ghost"}
                className="p-4 relative -top-4"
              >
                <Image
                  src={"/icons/arrow-back.svg"}
                  height={24}
                  width={20}
                  alt="go back"
                />
              </Button>
              <p className="text-base text-white text-center leading-7 mb-4">
                YORK BRITISH ACADEMY
              </p>
            </div>
            <NewConversationForm />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
