"use client";
import React, { useState } from "react";
import { Input, InputGroup, Nav } from "rsuite";
import { FaSearch } from "react-icons/fa";
import SearchIcon from "@rsuite/icons/Search";
import { IoCloseSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";

export default function Navbar() {
   const [active, setActive] = useState("home");
   const [openSearch, setOpenSearch] = useState(false);
   const [openMobileNav, setOpenMobileNav] = useState(false);

   interface navItem {
      id: number;
      title: string;
      url: string;
   }

   const navItems: navItem[] = [
      {
         id: 1,
         title: "home",
         url: "",
      },
      {
         id: 2,
         title: "categories",
         url: "",
      },
      {
         id: 3,
         title: "venues",
         url: "",
      },
      {
         id: 4,
         title: "certifications",
         url: "",
      },
      {
         id: 5,
         title: "training plan",
         url: "",
      },
      {
         id: 6,
         title: "contact us",
         url: "",
      },
   ];

   const Navbar = ({ ...props }: any) => {
      return (
         <Nav activeKey={active} onSelect={setActive} {...props}>
            {navItems.map((item: navItem) => {
               return (
                  <Nav.Item
                     eventKey={item.title}
                     className="text-white lg:text-[16px] lg:me-8 capitalize hover:!bg-transparent hover:!text-[var(--primary-color2)] focus:!bg-transparent"
                     key={item.id}
                     style={
                        active === item.title
                           ? { color: "var(--primary-color2)" }
                           : { color: "white" }
                     }
                  >
                     {item.title}
                  </Nav.Item>
               );
            })}
         </Nav>
      );
   };

   return (
      <nav
         className={`relative h-[75px] border-[var(--primary-color1)] flex items-center grow md:grow-0 ${
            openSearch ? "md:w-[calc(100%_-_268px)] " : "md:border-b-2"
         }`}
      >
         {!openSearch && <Navbar className="hidden md:block" />}

         {openMobileNav && (
            <div className="md:hidden absolute w-full sm:[85%] top-[105%] right-0 rounded-b-[10px] bg-[#135558] opacity-90 z-50">
               <Navbar className="rounded-b-[10px]" vertical />
            </div>
         )}

         <div
            className={`${
               openSearch
                  ? " w-[calc(100%_-_22px)]"
                  : "w-[calc(100%_-_22px)] md:hidden"
            }  `}
         >
            <InputGroup
               style={{ width: "100%", borderColor: "var(--primary-color1)" }}
            >
               <Input
                  className="bg-transparent text-[#ddd]"
                  placeholder="Search ..."
               />
               <InputGroup.Button className="!bg-[var(--primary-color2)]">
                  <SearchIcon className="text-white" />
               </InputGroup.Button>
            </InputGroup>
         </div>

         {openSearch ? (
            <IoCloseSharp
               className="text-[18px] md:text-[22px] text-white ms-3 cursor-pointer hidden md:block"
               onClick={() => setOpenSearch(!openSearch)}
            />
         ) : (
            <FaSearch
               className="text-[18px] md:text-[22px] text-white ms-3 cursor-pointer hidden md:block"
               onClick={() => setOpenSearch(!openSearch)}
            />
         )}
         <RiMenu3Line
            className="md:hidden text-[24px] text-white font-bold ml-[10px]"
            onClick={() => setOpenMobileNav(!openMobileNav)}
         />
      </nav>
   );
}
