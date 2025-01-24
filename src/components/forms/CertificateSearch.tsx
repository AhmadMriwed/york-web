"use client";

import Search from "@rsuite/icons/Search";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";

const CertificateSearch = () => {
  const router = useRouter();

  // Initialize formData with the correct structure
  const [formData, setFormData] = useState<{ certificate_id: string }>({
    certificate_id: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.certificate_id);

    const searchParams = new URLSearchParams();
    searchParams.append("certificate_id", formData.certificate_id);

    if (searchParams.size > 0) {
      router.push(
        `/certificates/certificatesSearch?${searchParams.toString()}`
      );
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-[20px] flex-wrap w-full">
        <div className="flex gap-2 flex-1">
          <div className="md:basis-[40%] p-1 mx-4 grow flex items-center rounded-lg bg-gray-300 relative">
            {/* Use a standard input element or import the Input component */}
            <input
              type="text"
              placeholder="Enter Certificate ID"
              className="bg-gray-300 placeholder:text-[11px] md:placeholder:text-sm outline-none ml-4 w-full p-2"
              value={formData.certificate_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  certificate_id: e.target.value,
                })
              }
            />
            <Button
              onClick={onSubmit}
              className="p-4 flex items-center justify-center bg-white transition-all duration-100 hover:bg-white hover:border-primary-color1 hover:border-[1.5px]"
            >
              <Search className="text-primary-color2  size-5 md:size-6" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CertificateSearch;
