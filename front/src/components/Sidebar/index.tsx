import React, { useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs'
import { sidebarLinks } from "../../assets";
import { NavLink } from "react-router-dom";
import LougoutConfirmation from '../Confirmation/logoutConfirmation'


const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <div
      onMouseEnter={() =>setOpen(true)}
      onMouseLeave={()=>setOpen(false)}
      className={`${open ? "w-[230px]" : "w-[70px] "
        } bg-white dark:bg-dark-bg-main  border-r-[1px] dark:border-gray-700 border-gray-200 h-screen p-3  pt-8 flex flex-col gap-4 fixed left-0 top-0 z-50 duration-300`}
    >
      {/* {open ?
        <BsFillArrowLeftCircleFill
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple bg-white
        border-2 rounded-full "
          onClick={() => setOpen(false)} /> :
        <BsFillArrowRightCircleFill
          className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-dark-purple bg-white
        border-2 rounded-full "
          onClick={() => setOpen(true)}
        />
      } */}

      <div className="flex gap-x-4 items-center">
        <img
          src="https://png.pngtree.com/png-vector/20211106/ourmid/pngtree-letter-p-logo-png-image_4011792.png"
          className={`cursor-pointer h-10 w-10 rounded-full duration-500 ${open && "rotate-[360deg]"
            }`}
        />
        <h1
          className={`font-mono text-2xl dark:text-gray-300 text-gray-800 text-center duration-500 ${!open && "scale-0 opacity-0"
            }`}
        >
          ProxyAdds
        </h1>
      </div>
      <ul className="relative pt-6 flex flex-col gap-2 overflow-hidden h-full">
        {sidebarLinks.map((link, index) => (
          <li
            key={index}

          >
            <NavLink to={link.link} className={({ isActive }) => { return `flex   rounded-xl p-2 pl-4 h-7 cursor-pointer dark:bg-light-white bg-gray-100 dark:text-gray-300 text-gray-500 text-sm items-center gap-x-4  ${isActive && "dark:bg-[#22d3ee44] "}`; }} >
              {link.icon}
              <span className={`${!open && "hidden"} origin-left duration-400`}>
                {link.title}
              </span>
            </NavLink>
          </li>
        ))}
       
          <LougoutConfirmation isSidebarOpen={open}/>
        
      </ul>
      
    </div>
  );
};

export default Sidebar;