import Navbar from "@/components/user/home/Navbar";
import Image from "next/image";
import logo from "../../public/logo.png";
import DefaultButton from "@/components/buttons/DefaultButton";
import Link from "next/link";
import {
   address,
   addresses,
   categories,
   category,
   links,
   newsItems,
   newsItme,
} from "@/utils/user/home/homePageEnums";
import HomeCourseAds from "@/components/user/home/HomeCourseAds";
import UserInfo from "@/components/user/home/UserInfo";

console.log("this is server component");

export default function Home() {
   const SectionTitle = ({
      title,
      desc,
      direction,
   }: {
      title: string;
      desc?: string;
      direction?: "col" | "col-reverse";
   }) => {
      return (
         <div
            className={`relative flex ${
               direction === "col" ? "flex-col" : "flex-col-reverse"
            } capitalize`}
         >
            <h3 className="text-black text-[35px] font-bold">{title}</h3>
            {desc && (
               <p className="text-[#7d7d7d] text-[20px] font-normal">{desc}</p>
            )}

            <span className="absolute bottom-[-20px] w-full max-w-[200px] h-[2px] bg-[var(--primary-color2)]" />
         </div>
      );
   };

   const NewsCard = ({ item }: { item: newsItme }) => {
      return (
         <div className="w-[366px] min-h-[405px] px-[30px] bg-[var(--home-color)] rounded-[10px] hover:translate-y-[-6px] duration-300 transition-all cursor-default">
            <div className="relative h-[215px] rounded-b-[10px]">
               <Image
                  src={item.image}
                  alt="news"
                  fill
                  className="rounded-b-[10px]"
               />
               <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-b from-[#01989f] to-[var(--home-color)] opacity-80 rounded-b-[10px]" />{" "}
               <h3 className="text-white absolute bottom-0 p-3 text-[26px] font-bold leading-[1.1] capitalize">
                  {item.title}
               </h3>
            </div>

            <p className="text-[14px] py-5 text-[#777]">{item.description}</p>
         </div>
      );
   };

   const CategoryCard = ({ item }: { item: category }) => {
      return (
         <div className="flex justify-center items-center gap-3 flex-col p-[20px] w-[230px] h-[160px] bg-[var(--home-color)] rounded-[10px] hoverEffect cursor-default">
            <div className="footer-bg"></div>
            <div className="w-[80px] h-[80px] aspect-[1/1]">
               <Image
                  src={item.image}
                  alt={item.title}
                  className="aspect-[1/1]"
                  width={80}
                  height={80}
                  loading="lazy"
               />
            </div>

            <p className="text-[15px] font-semibold text-[var(--primary-color2)] text-center capitalize">
               {item.title}
            </p>
         </div>
      );
   };

   return (
      <section className="relative ">
          {/* <UserInfo /> */}
         <section className="home-landing-bg">
            <header className="px-[10px] md:px-[50px] lg:px-[70px] py-3 flex items-center justify-between gap-[30px]">
               { /*<div className="min-w-[65px] md:min-w-[100px]">
                  <Image
                     src={logo}
                     alt="Logo"
                     width={100}
                     height={100}
                     className="w-[60px] md:w-[100px]"
                  />
               </div> */ }
               <Navbar />
            </header>

            <main className="flex justify-center items-center flex-col h-[calc(100%_-_125px)] px-[20px] md:px-[50px]">
               <h1 className="text-white md:w-full lg:w-[815px] leading-[1.4] text-[23px] sm:text-[32px] md:text-[40px] font-semibold capitalize mb-[30px]">
                  make your employees on development with <br /> york
                  academy
               </h1>
               <p className="text-[#c2c2c2] md:w-full lg:w-[815px] ">
                  The opportunity for interaction between employees Given that
                  this training is conducted in a spatial environment, it allows
                  staff interaction. They share information, experiences, and
                  knowledge. Especially in larger companies, with many
                  divisions, such moments may be the only ones for employees
                  from different teams and divisions to interact.
               </p>

               <div className="my-5 md:w-full lg:w-[815px]">
                  <DefaultButton
                     label="view courses"
                     // onClick={() => ()}
                  />
               </div>
            </main>
         </section>

         <HomeCourseAds />

         <section>
            <div className="ms-[50px] sm:ms-[80px]">
               <SectionTitle
                  title="york academy"
                  desc="welcome to"
                  direction="col-reverse"
               />
            </div>

            <main className="relative home-welcome-bg min-h-[270px] mt-[80px] flex justify-between items-center flex-col sm:flex-row py-[30px] px-[50px] lg:px-[100px] gap-[20px] flex-wrap">
               {/* <div className="min-w-[100px] lg:ms-[100px]"> <Image src={logo} alt="Logo" width={200} height={200} /  </div> */}
               <div className="basis-[50%]">
                  <p className="text-white mb-3">
                     York Academy registered office in England and
                     Wales. In the United Kingdom, its main objective is to
                     provide training and advisory services and strategic
                     solutions for postgraduate studies in higher education,
                     cultural education, educational support services. It has
                     agents, representatives and partnerships in the EU and East
                     Asia in doing so, it seeks to provide its services in the
                     regional and international environment. Nowadays the
                     majority of people do business and companies learn the
                     importance of internal training Any training in companies
                     to improve the performance of employees and reach strategic
                     goals.
                  </p>
                  <Link
                     href={"#"}
                     className="text-[var(--primary-color1)] hover:text-[var(--primary-color2)]"
                  >
                     Read More
                  </Link>
               </div>
               <span className="hidden md:inline !absolute w-[55%] h-[135%] left-[40%] border-2 border-[var(--primary-color1)]" />
            </main>
         </section>

         <section className="mt-[130px]">
            <div className="ms-[50px] sm:ms-[80px] flex justify-between gap-7 flex-wrap">
               <SectionTitle
                  title="York News"
                  desc="keep up with our newset feeds"
                  direction="col"
               />

               <Link
                  href={"#"}
                  className="self-end text-[var(--primary-color1)] hover:text-[var(--primary-color2)] me-[80px] font-semibold text-[20px] capitalize mt-[10px]"
               >
                  Read more
               </Link>
            </div>

            <div className="relative mt-[90px]">
               <div className="absolute z-[-1] xl:h-[70%] w-full bg-[#023141] shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] top-[50%] translate-y-[-50%]"></div>
               <div className="px-[30px] flex items-center gap-[30px] justify-center flex-wrap">
                  {newsItems.map((item: newsItme) => {
                     return <NewsCard key={item.id} item={item} />;
                  })}
               </div>
            </div>
         </section>
         <section className="mt-[130px]">
            <div className="flex justify-center items-center">
               <SectionTitle title="Categories" />
            </div>
            <main className="home-categories-bg mt-[60px] py-[30px] px-[10px] md:px-[20px] flex justify-center items-center gap-[15px] flex-wrap">
               {categories.map((category: category) => {
                  return <CategoryCard key={category.id} item={category} />;
               })}
            </main>
         </section>
         <section className="mt-[50px]">
            <div className="flex justify-center items-center">
               <SectionTitle title="Venues" />
            </div>
         </section>

         <footer className="home-footer-bg mt-[60px] px-[30px] md:px-[80px] py-[30px] flex items-center gap-x-[40px] gap-y-[20px] flex-wrap">
            <div className="w-[400px] max-w-[calc(100%_-_60px)] flex items-center gap-3 flex-col">
               <div>
                  <Image src={logo} alt="Logo" width={130} height={130} />
               </div>
               <p className="text-[#ddd]">
                  The York Academy is currently pursuing an ambitious
                  vision of transforming the integration of metacognitive and
                  self-questioning strategies into developing thinking skills,
                  retaining the impact of learning and training, and raising the
                  quality level of confidence.
               </p>
            </div>

            <div className="text-white h-[170px]">
               <h3 className="font-bold text-[24px] uppercase">Address</h3>
               <ul className="list-disc ms-[18px] mt-[10px]">
                  {addresses.map((address: address) => {
                     return (
                        <li
                           key={address.id}
                           className="mt-[3px] capitalize cursor-pointer hover:translate-x-1 hover:text-[var(--primary-color2)] transition-all duration-300"
                        >
                           {address.title}
                        </li>
                     );
                  })}
               </ul>
            </div>
            <div className="text-white h-[170px] ">
               <h3 className="font-bold text-[24px] capitalize">Quick links</h3>
               <ul className="list-disc ms-[18px] mt-[10px]">
                  {links.map((link: address) => {
                     return (
                        <li
                           key={link.id}
                           className="mt-[3px] cursor-pointer hover:translate-x-1 hover:text-[var(--primary-color2)] transition-all duration-300"
                        >
                           {link.title}
                        </li>
                     );
                  })}
               </ul>
            </div>
         </footer>
      </section>
   );
}
