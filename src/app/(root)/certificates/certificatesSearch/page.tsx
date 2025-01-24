"use client";
import Loader from "@/components/loading/Loader";
import { SearchCertificate } from "@/lib/action/root_action";
import { Certificate } from "@/types/rootTypes/rootTypes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CertificateSearch from "@/components/forms/CertificateSearch";
import Image from "next/image";
import { NotFoundSection } from "@/components/NotFoundSection";
import { Calendar } from "@rsuite/icons";

const CertificateHeroSection = () => {
  return (
    <div className="certificates-bg h-[80vh] flex items-center justify-center flex-col">
      <h1 className="text-3xl md:text-5xl w-full md:max-w-[60%] mx-auto text-white font-bold text-center">
        SEARCH FOR CERTIFICATES ACCREDITED
      </h1>
      <div className="w-full md:w-[60%] mx-auto mt-16">
        <CertificateSearch />
      </div>
    </div>
  );
};

interface CertificateDetailsProps {
  certificate: Certificate;
}

const CertificateDetails = ({ certificate }: CertificateDetailsProps) => {
  return (
    <div className="container mx-auto my-12 p-6 bg-white rounded-lg shadow-sm">
      <div className="grid grid-cols-1 gap-4   md:grid-cols-3">
        <div className="flex justify-center items-center col-span-2">
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
        <div className="space-y-6 border border-primary-color1 shadow-lg rounded-lg p-6 ml-4">
          {/* Trainer Image */}
          <div className="flex flex-col items-center space-x-4">
            <Image
              src={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${certificate.trainer_img}`}
              alt="Trainer Image"
              width={150}
              height={150}
              className="rounded-full border"
            />
            <p className=" text-gray-500 font-semibold">
              {certificate.trainer_full_name}
            </p>
          </div>
          <h2 className="text-xl font-bold text-primary-color2">
            Certificate Details
          </h2>
          <div className="space-y-4">
            <p className="flex items-center space-x-2 text-gray-700">
              <span className="font-semibold flex items-center">
                <Calendar className="size-6 mr-2 text-primary-color2" />
                Valid From:
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium">
                {certificate.valid_from}
              </span>
            </p>
            <p className="flex items-center gap-2 space-x-2 text-gray-700 mt-2">
              <span className="font-semibold flex items-center">
                <Calendar className="size-6 mr-2 text-primary-color2" />
                Valid To:
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm font-medium">
                {certificate.valid_to}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const searchParams = useSearchParams();

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="h-full relative">
      <CertificateHeroSection />
      {!certificate ? (
        <NotFoundSection />
      ) : (
        <CertificateDetails certificate={certificate} />
      )}
    </main>
  );
};

export default Page;
