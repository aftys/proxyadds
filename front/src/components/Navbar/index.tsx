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
                className="fixed top-0 left-0 right-0 flex gap-6 justify-end w-full py-2 px-12    z-40 bg-white dark:bg-dark-bg-main border-b-[1px] dark:border-gray-700 border-gray-200"
            >
                    <BsSearch onClick={() => handleClick('search')} className="fill-[#22d3ee] w-[34px] h-[34px] p-[6px] rounded-full border-2 overflow-visible border-gray-300 dark:border-blue-950" />
                    <IoIosNotificationsOutline onClick={() => handleClick('notif')} className="fill-[#22d3ee] w-[34px] h-[34px] p-[2px] rounded-full border-2 overflow-visible border-gray-300 dark:border-blue-950" />
                    <Switcher/>
                    <img src={"https://th.bing.com/th/id/R.fa0ca630a6a3de8e33e03a009e406acd?rik=UOMXfynJ2FEiVw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2ff%2fa%2f0%2fc%2f1434020125875430376profile.png&ehk=73x7A%2fh2HgYZLT1q7b6vWMXl86IjYeDhub59EZ8hF14%3d&risl=&pid=ImgRaw&r=0"} onClick={() => handleClick('profile')} className="w-[34px] h-[34px] rounded-full border-2 border-gray-300 dark:border-blue-950" />
               
            </nav>
            <AnimatePresence mode="wait">
                {isClicked.profile && <Profile close={()=>setIsClicked(initialStates)} />}
                {isClicked.notif && <Notification close={()=>setIsClicked(initialStates)} />}
            </AnimatePresence>
        </>
    );
}

export default Navbar;