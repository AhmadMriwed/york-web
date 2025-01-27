

export interface category {
   id: number;
   title: string;
   description:string;
   image: string|null;
}

export interface address {
   id: number;
   title: string;
   url: string;
}



export const addresses: address[] = [
   {
      id: 1,
      title: "EMAIL",
      url: "#",
   },
   {
      id: 2,
      title: "info@yorkacademy.uk",
      url: "#",
   },
   {
      id: 3,
      title: "OFFICE",
      url: "#",
   },
   {
      id: 4,
      title: "London (WC2) Office, 7 Bell Yard, London, WC2A 2JR",
      url: "#",
   },
];

export const links: address[] = [
   {
      id: 1,
      title: "Home",
      url: "/home",
   },
   {
      id: 2,
      title: "About Us",
      url: "/about-us",
   },
   {
      id: 3,
      title: "Contact Us",
      url: "/contact-us",
   },
];
