type staticEnum = { label: string; value: string };
type EnumTypes = {
   statusEnum: staticEnum[];
   accountTypeEnum: staticEnum[];
   entityTypesEnum: staticEnum[];
   userTypesEnum: staticEnum[];
   activateAccount: staticEnum[];
};

export const useStaticEnums = (): EnumTypes => {
   let enumTypes: EnumTypes = {
      statusEnum: [
         {
            label: "Accepted",
            value: "Accepted",
         },
         {
            label: "Rejected",
            value: "Rejected",
         },
         {
            label: "Banned",
            value: "Banned",
         },
      ],
      accountTypeEnum: [
         {
            label: "User",
            value: "user",
         },
         {
            label: "Admin",
            value: "admin",
         },
         {
            label: "Trainer",
            value: "trainer",
         },
      ],
      entityTypesEnum: [
         {
            label: "Certificated",
            value: "certificated",
         },
         {
            label: "Uncertifiated",
            value: "uncertifiated",
         },
      ],
      userTypesEnum: [
         {
            label: "Trainee",
            value: "trainee",
         },
         {
            label: "Client",
            value: "client",
         },
      ],
      activateAccount: [
         {
            label: "Banned",
            value: "Banned",
         },
         {
            label: "Accepted",
            value: "Accepted",
         },
         {
            label: "Rejected",
            value: "Rejected",
         },
      ],
   };
   return enumTypes;
};
