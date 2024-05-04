import type { Config } from "tailwindcss";

const config: Config = {
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         screens: {
            crudCustom1: "1020px",
            crudCustom2: "860px",
         },
         backgroundImage: {
            // "home-landing-bg": "url('public/assets/user/landing-page.jpg')",
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         fontFamily: {
            montserrat: ["var(--font-montserrat)"],
         },
         colors: {
            dark: "#13181e",
            light: "#dadee7",
            btnColor: "#3c417c",
         },
      },
   },
   plugins: [],
};
export default config;
