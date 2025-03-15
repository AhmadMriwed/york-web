import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { terms1, terms2 } from "@/constants";
import Image from "next/image";
import Cookies from "js-cookie";

type Props = {
  termDialogOpen: boolean;
  setTermDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermAndPrivacy = ({ termDialogOpen, setTermDialogOpen }: Props) => {
  const locale = Cookies.get("language");
  const terms = locale === "en" ? terms1 : terms2;
  const isArabic = locale === "ar";

  return (
    <Dialog open={termDialogOpen} onOpenChange={setTermDialogOpen}>
      <DialogContent
        className={`bg-slate-800 md:w-[60vw] max-w-full md:max-w-5xl border-none p-6 rounded-lg max-h-[90vh] overflow-y-scroll ${
          isArabic ? "text-right" : "text-left"
        }`}
      >
        <DialogHeader>
          <Image
            src="/logo.png"
            height={180}
            width={180}
            alt="logo"
            className="mx-auto"
          />
        </DialogHeader>
        <div className="text-white mt-4">
          <h2 className="text-xl font-bold text-primary-color2">
            {isArabic ? " سياسة الخصوصية :" : "Privacy Policy"}
          </h2>
          <p className="mt-4 text-sm">
            <strong>
              {isArabic ? "   تاريخ النفاذ : " : "Effective Date:"}
            </strong>{" "}
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].effectiveDate}
          </p>
          <p className="mt-4">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].introduction}
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2">
            {isArabic ? " المعلومات التي نجمعها : " : "Information We Collect:"}
          </h3>
          <ul
            className={` ${isArabic ? "pr-6 list-outside" : "pl-6 list-disc"}`}
          >
            {Object.values(
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .informationWeCollect
            ).map((info, index) => (
              <li key={index} className="text-sm">
                {info}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic
              ? " كيف نستخدم معلوماتك : "
              : "How We Use Your Information:"}
          </h3>
          <ul
            className={` ${isArabic ? "pr-6 list-outside" : "pl-6 list-disc"}`}
          >
            {terms[
              "Privacy Policy for [YORK BRITISH ACADEMY]"
            ].howWeUseYourInformation.map((use, index) => (
              <li key={index} className="text-sm">
                {use}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic ? "  مشاركة معلوماتك :" : "Sharing Your Information:"}
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .sharingYourInformation.note
            }
          </p>
          <ul
            className={` ${isArabic ? "pr-6 list-outside" : "pl-6 list-disc"}`}
          >
            {Object.values(
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .sharingYourInformation
            ).map(
              (share, index) =>
                index !== 0 && (
                  <li key={index} className="text-sm">
                    {share}
                  </li>
                )
            )}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic ? " أمان البيانات : " : "Data Security:"}
          </h3>
          <p className="text-sm">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].dataSecurity}
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic ? "حقوقك : " : "Your Rights:"}
          </h3>
          <ul
            className={` ${isArabic ? "pr-6 list-outside" : "pl-6 list-disc"}`}
          >
            {Object.values(
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"].yourRights
            ).map((right, index) => (
              <li key={index} className="text-sm">
                {right}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic
              ? "   ملفات تعريف الارتباط وتقنيات التتبع : "
              : "Cookies and Tracking Technologies:"}
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .cookiesAndTrackingTechnologies
            }
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic
              ? "التغييرات على سياسة الخصوصية هذه : "
              : "Changes to This Privacy Policy:"}
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .changesToThisPrivacyPolicy
            }
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            {isArabic ? "اتصل بنا : " : "Contact Us:"}
          </h3>
          <p className="text-sm">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].contactUs.tel}
          </p>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"].contactUs
                .website
            }
          </p>
          <p className="text-sm">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].contactUs.email}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermAndPrivacy;
