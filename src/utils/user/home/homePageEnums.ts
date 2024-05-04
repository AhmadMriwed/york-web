export interface newsItme {
   id: number;
   title: string;
   description: string;
   image: string;
}

export interface category {
   id: number;
   title: string;
   image: string;
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

export const categories: category[] = [
   {
      id: 1,
      title: "management And leadership",
      image: "/assets/user/home/categories/management-and-leadership.png",
   },
   {
      id: 2,
      title: "strategy",
      image: "/assets/user/home/categories/strategy.png",
   },
   {
      id: 3,
      title: "administration support",
      image: "/assets/user/home/categories/administration-support.png",
   },
   {
      id: 4,
      title: "contracts management",
      image: "/assets/user/home/categories/contracts-management.png",
   },
   {
      id: 5,
      title: "professional development",
      image: "/assets/user/home/categories/procurement-and-tenders.png",
   },
   {
      id: 6,
      title: "aeronautics and aviation",
      image: "/assets/user/home/categories/aeronautics-and-aviation.png",
   },
   {
      id: 7,
      title: "health safety & security",
      image: "/assets/user/home/categories/health-safety-&-security.png",
   },
   {
      id: 8,
      title: "professional development",
      image: "/assets/user/home/categories/professional-development.png",
   },
   {
      id: 9,
      title: "project management",
      image: "/assets/user/home/categories/project-management.png",
   },
   {
      id: 10,
      title: "audit and quality assurance",
      image: "/assets/user/home/categories/audit-and-quality-assurance.png",
   },
   {
      id: 11,
      title: "human resource management",
      image: "/assets/user/home/categories/human-resource-management.png",
   },

   {
      id: 12,
      title: "banking & investment",
      image: "/assets/user/home/categories/banking-&-investment.png",
   },

   {
      id: 13,
      title: "oil and gas",
      image: "/assets/user/home/categories/oil-and-gas.png",
   },

   {
      id: 14,
      title: "information technology",
      image: "/assets/user/home/categories/information-technology.png",
   },
   {
      id: 15,
      title: "sales & marketing",
      image: "/assets/user/home/categories/sales-&-marketing.png",
   },

   {
      id: 16,
      title: "electrical engineer",
      image: "/assets/user/home/categories/electrical-engineer.png",
   },

   {
      id: 17,
      title: "instrumentation & process controles",
      image: "/assets/user/home/categories/instrumentation-&-process-controles.png",
   },

   {
      id: 18,
      title: "Quality And Knowledge For Public Relations",
      image: "/assets/user/home/categories/quality-and-knowledge.png",
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
      title: "info@yorkbritishacademy.uk",
      url: "#",
   },
   {
      id: 3,
      title: "OFFICE",
      url: "#",
   },
   {
      id: 4,
      title: "old gloucester street, wc1n 3ax, london, united kingdom",
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
