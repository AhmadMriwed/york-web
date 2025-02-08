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
import Script from "next/script";

export function Conversation() {
    return (
    <Script
    id="tawk.to-script"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{
      __html: `
        var Tawk_API = Tawk_API || {},
          Tawk_LoadStart = new Date();
        (function() {
          var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/5e57ba49298c395d1cea1bff/1fojpo2rd';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `,
    }}
  />
  );
}
