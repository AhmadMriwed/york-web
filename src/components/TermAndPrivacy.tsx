import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { terms } from "@/constants";
import Image from "next/image";

type Props = {
  termDialogOpen: boolean;
  setTermDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TermAndPrivacy = ({ termDialogOpen, setTermDialogOpen }: Props) => {
  return (
    <Dialog open={termDialogOpen} onOpenChange={setTermDialogOpen}>
      <DialogContent className="bg-slate-800 md:w-[60vw]  max-w-full md:max-w-5xl border-none p-6  rounded-lg max-h-[90vh] overflow-y-scroll">
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
            Privacy Policy
          </h2>
          <p className="mt-4 text-sm">
            <strong>Effective Date:</strong>{" "}
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].effectiveDate}
          </p>
          <p className="mt-4">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].introduction}
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2">
            Information We Collect:
          </h3>
          <ul className="list-disc pl-6">
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
            How We Use Your Information:
          </h3>
          <ul className="list-disc pl-6">
            {terms[
              "Privacy Policy for [YORK BRITISH ACADEMY]"
            ].howWeUseYourInformation.map((use, index) => (
              <li key={index} className="text-sm">
                {use}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            Sharing Your Information:
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .sharingYourInformation.note
            }
          </p>
          <ul className="list-disc pl-6">
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
            Data Security:
          </h3>
          <p className="text-sm">
            {terms["Privacy Policy for [YORK BRITISH ACADEMY]"].dataSecurity}
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            Your Rights:
          </h3>
          <ul className="list-disc pl-6">
            {Object.values(
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"].yourRights
            ).map((right, index) => (
              <li key={index} className="text-sm">
                {right}
              </li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            Cookies and Tracking Technologies:
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .cookiesAndTrackingTechnologies
            }
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            Changes to This Privacy Policy:
          </h3>
          <p className="text-sm">
            {
              terms["Privacy Policy for [YORK BRITISH ACADEMY]"]
                .changesToThisPrivacyPolicy
            }
          </p>

          <h3 className="mt-4 font-semibold text-lg text-primary-color2 mb-2">
            Contact Us:
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
