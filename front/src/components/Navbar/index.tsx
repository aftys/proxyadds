import { useState } from "react";
import { AnimatePresence} from "framer-motion";
import Switcher from "../Switcher";
import { BsSearch } from 'react-icons/bs';
import {IoIosNotificationsOutline} from "react-icons/io"
import Profile from "../Modals/Profile";
import Notification from "../Modals/Notification";

const Navbar: React.FC = () => {
    const initialStates={search:false,profile:false,notif:false}
    const [isClicked,setIsClicked]=useState(initialStates)
    function handleClick(nav:string){
        setIsClicked({...initialStates,[nav]:true})
    }

    

    return (
        <>
            <nav
                className="fixed top-0 flex gap-6 justify-end w-full py-2 px-12    z-40 bg-white dark:bg-dark-bg-main border-b-[1px] dark:border-gray-700 border-gray-200"
            >
                    <BsSearch onClick={() => handleClick('search')} className="fill-[#10b981] w-[34px] h-[34px] p-[6px] rounded-full border-2 overflow-visible border-gray-300 dark:border-blue-950" />
                    <IoIosNotificationsOutline onClick={() => handleClick('notif')} className="fill-[#10b981] w-[34px] h-[34px] p-[2px] rounded-full border-2 overflow-visible border-gray-300 dark:border-blue-950" />
                    <Switcher/>
                    <img src={"https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"} onClick={() => handleClick('profile')} className="w-[34px] h-[34px] rounded-full border-2 border-gray-300 dark:border-blue-950" />
               
            </nav>
            <AnimatePresence>
                {isClicked.profile && <Profile close={()=>setIsClicked(initialStates)} />}
                {isClicked.notif && <Notification close={()=>setIsClicked(initialStates)} />}
            </AnimatePresence>
        </>
    );
}

export default Navbar;