import React, { useState } from "react";
import {  BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { sidebarLinks } from "../../assets";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
 

  return (
    <div
      className={`${open ? "w-72" : "w-[70px] "
        } bg-dark-purple h-screen p-5  pt-8 flex flex-col gap-4 fixed left-0 z-50 duration-300`}
    >
      {open ?
        <BsFillArrowLeftCircleFill
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple bg-white
        border-2 rounded-full "
          onClick={() => setOpen(false)} /> :
        <BsFillArrowRightCircleFill
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple bg-white
        border-2 rounded-full "
          onClick={() => setOpen(true)}
        />
      }

      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/logo.png"
          className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6 flex flex-col gap-2">
        {sidebarLinks.map((link, index) => (
          <li
            key={index}
            className={`flex  rounded-md p-2 h-8 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
               ${index === 0 && "bg-light-white"
              } `}
          >
            {link.icon}
           {open &&  <span className="origin-left duration-200">
              {link.title}
            </span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;