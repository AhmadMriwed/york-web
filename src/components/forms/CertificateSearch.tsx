"use client";

import Search from "@rsuite/icons/Search";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const CertificateSearch = () => {
  const router = useRouter();
  const pathname = usePathname(); // المسار الحالي
  const locale = useLocale(); // اللغة الحالية
  const t = useTranslations("Certificates");
  const language = useLocale();

  // حالة لتخزين معلمات البحث
  const [formData, setFormData] = useState<{ certificate_id: string }>({
    certificate_id: "",
  });

  // عند تحميل المكون، قم بقراءة معلمات البحث من الـ URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const certificateId = searchParams.get("certificate_id") || "";
    setFormData({ certificate_id: certificateId });
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.certificate_id);

    const searchParams = new URLSearchParams();
    searchParams.append("certificate_id", formData.certificate_id);

    if (searchParams.size > 0) {
      const newPath = `/${locale}/certificates/certificatesSearch?${searchParams.toString()}`;
      router.push(newPath);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-[20px] flex-wrap w-full">
        <div className="flex gap-2 flex-1">
          <div className="md:basis-[40%] p-1 mx-4 grow flex items-center rounded-lg bg-gray-300 relative">
            {/* حقل إدخال معلمات البحث */}
            <input
              type="text"
              placeholder={t("placeholder")}
              className={cn(
                "bg-gray-300 placeholder:text-[11px]  md:placeholder:text-sm outline-none ml-4 w-full p-2",
                language === "ar" ? "text-end" : ""
              )}
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
