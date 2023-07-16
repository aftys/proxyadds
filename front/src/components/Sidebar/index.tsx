import React, { useState } from "react";
import {  BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { sidebarLinks } from "../../assets";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(true);
 

  return (
    <div
      className={`${open ? "w-[230px]" : "w-[70px] "
        } bg-white dark:bg-dark-bg-main border-r-[1px] dark:border-gray-700 border-gray-200 h-screen p-3  pt-8 flex flex-col gap-4 fixed left-0 top-0 z-50 duration-300`}
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
          className={`dark:text-white text-gray-700 origin-left font-medium text-xl duration-200 ${!open && "scale-0"
            }`}
        >
          Designer
        </h1>
      </div>
      <ul className="pt-6 flex flex-col gap-2">
        {sidebarLinks.map((link, index) => (
          <li
            key={index}
            className={`flex   rounded-md p-2 pl-4 h-8 cursor-pointer hover:bg-light-white dark:text-gray-300 text-gray-500 text-sm items-center gap-x-4 
               ${index === 0 && "bg-gray-200 dark:bg-light-white"
              } `}
          >
            {link.icon}
            <span className={`${!open && "hidden"} origin-left duration-400`}>
                {link.title}
              </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;