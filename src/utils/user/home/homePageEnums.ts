export interface newsItme {
   id: number;
   title: string;
   description: string;
   image: string;
}

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

export const newsItems: newsItme[] = [
   {
      id: 1,
      title: "Her Majesty the queen",
      description:
         "Supreme Council and Academy Team are deeply saddened to hear about the passing of our Patron, Her Majesty The Queen.We extend our heartfelt condolences to His Majesty The King and all of the Royal Family at this time of grief .",
      image: "/assets/user/home/news-section/news-1.jpg",
   },
   {
      id: 2,
      title: "project management for non-manaerial",
      description:
         " Most organizations are recognizing projects as not only the vehicle for delivering new product and services or process / system changes, but also a regular component of most people`s working lives. Project Management training is therefore not only a requirement for dedicated `Project Managers` ",

      image: "/assets/user/home/news-section/news-2.jpg",
   },
   {
      id: 3,
      title: "leading strategic HR transformation",
      description:
         "HRM  (SHRM) is about attracting, developing, rewarding, and retaining employees for the benefit of both the employees as individuals and the organization.Thus, the goals of an HR Department should reflect and support the goals of the rest of the organization.",

      image: "/assets/user/home/news-section/news-3.jpg",
   },
];



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
      url: "/",
   },
   {
      id: 2,
      title: "About Us",
      url: "#",
   },
   {
      id: 3,
      title: "Contact Us",
      url: "#",
   },
];
