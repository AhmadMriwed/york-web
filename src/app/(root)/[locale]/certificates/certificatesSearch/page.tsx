"use client";
import Loader from "@/components/loading/Loader";
import { SearchCertificate } from "@/lib/action/root_action";
import { Certificate } from "@/types/rootTypes/rootTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar } from "@rsuite/icons";
import CertificateSearch from "@/components/forms/CertificateSearch";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import CretificateForm from "@/components/forms/cretificateForm";
import { NotFoundSection } from "@/components/review/NotFoundSection";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface CertificateDetailsProps {
  certificate: Certificate;
}

const isCertificateValid = (validTo: string): boolean => {
  const currentDate = new Date();
  const validToDate = new Date(validTo);
  return validToDate >= currentDate;
};

const CertificateDetails = ({ certificate }: CertificateDetailsProps) => {
  const isValid = isCertificateValid(certificate.valid_to);
  const locale = useLocale();
  const t = useTranslations("Certificates");

  return (
    <div className="container mx-auto my-12 p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="col-span-2 border-8 border-double shadow-lg ">
          <Image
            src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${certificate.certificate_img}`}
            alt="Certificate Image"
            width={800}
            height={600}
            className="rounded-lg"
            priority
          />
        </div>

        {/* Certificate Details */}
        <div className="space-y-6 border border-primary-color1 shadow-lg rounded-lg p-6 pb-16 ml-4 h-fit bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-shadow duration-300">
          {/* Trainer Image */}
          <div className="flex flex-col items-center space-x-4 relative">
            <div className="relative">
              <Image
                src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${certificate.trainer_img}`}
                alt="Trainer Image"
                width={150}
                height={150}
                className="rounded-full h-32 border-4 border-primary-color2 shadow-md hover:border-primary-color1 transition-all duration-300"
              />
              {isValid ? (
                <Image
                  src={"/information/validation.png"}
                  width={100}
                  height={100}
                  alt="validation"
                  className="absolute top-16 left-36 hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <Image
                  src={"/information/expired.png"}
                  width={180}
                  height={180}
                  alt="validation"
                  className="absolute top-16 -right-8 hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <p className="text-gray-700 font-semibold mt-4 text-xl">
              {certificate.trainer_full_name}
            </p>
          </div>

          {/* Certificate Details */}
          <h2 className="text-2xl font-bold text-primary-color2 text-center mb-6">
            {t("card.title")}
          </h2>
          <div className="space-y-4">
            <p className={cn("flex items-center space-x-2 text-gray-700")}>
              <span className="font-semibold flex items-center">
                <Calendar className="size-6 mx-2 text-primary-color2" />
                {t("card.valid from")}
              </span>
              <span
                className={cn(
                  "bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium shadow-inner"
                )}
              >
                {certificate.valid_from}
              </span>
            </p>
            <p className={cn("flex items-center space-x-2 text-gray-700")}>
              <span className="font-semibold flex items-center">
                <Calendar className="size-6 mx-2 text-primary-color2" />
                {t("card.valid to")}
              </span>
              <span className="bg-gray-100  px-3 py-1 rounded-lg text-sm font-medium shadow-inner">
                {certificate.valid_to}
              </span>
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-6 text-gray-700   text-sm italic text-center bg-gray-100 p-4 leading-6 rounded-lg border border-gray-100">
            {t("card.desc")}
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const t = useTranslations("Certificates");

  useEffect(() => {
    const fetchCertificate = async () => {
      setIsLoading(true);

      try {
        const certificateId = searchParams.get("certificate_id");
        if (certificateId) {
          const result = await SearchCertificate(certificateId);
          setCertificate(result);
        } else {
          setCertificate(null);
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        setCertificate(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificate();
  }, [searchParams]);

  useEffect(() => {
    // Open the dialog if no certificate is found
    if (!isLoading && !certificate) {
      setIsDialogOpen(true);
    }
  }, [isLoading, certificate]);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="h-full relative w-full">
      <div className="certificates-bg h-[80vh] flex items-center justify-center flex-col">
        <h1 className="text-3xl md:text-5xl w-full md:max-w-[60%] mx-auto text-white font-bold text-center">
          {t("title")}
        </h1>
        <div className="w-full md:w-[60%] mx-auto mt-16">
          <CertificateSearch />
        </div>
      </div>

      {/* Check if certificate is found or not */}
      {certificate ? (
        <CertificateDetails certificate={certificate} />
      ) : (
        <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
          <DialogContent className="bg-slate-800 border-none w-full md:w-[80vw] max-w-full max-h-[75vh] flex items-center justify-center">
            <div className="flex justify-center items-center p-2 mt-4 md:p-8 gap-8 ">
              <div className="hidden md:block mb-8">
                <NotFoundSection title={t("notFound.subTitle")} />
              </div>
              <CretificateForm />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
};

export default Page;
