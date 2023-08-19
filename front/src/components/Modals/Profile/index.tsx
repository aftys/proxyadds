import React from 'react';
import { motion } from 'framer-motion';
import { userProfileData } from '../../../assets';
import { MdOutlineCancel } from 'react-icons/md';
import { HiLogout } from 'react-icons/hi';
import Button from '../../Button';

interface ProfileProps {
  close: () => void;
}

const Profile: React.FC<ProfileProps> = ({ close }) => {
  const currentColor = "#22d3ee";
  
  return (
    <motion.div
      className="nav-item z-40  fixed border-[1px] right-4 top-[60px] bg-white dark:bg-dark-bg-main  dark:border-gray-700 rounded-xl "
      animate={{ y: 0, opacity: 1, transition: { default: { duration: 1, ease: [0, 0.71, 0.2, 1.01] } } }} initial={{ y: +60, opacity: 0 }} exit={{ y: -60, opacity: 0 }}
    >
      <div className="flex justify-between items-center px-4">
        <p style={{ color: currentColor }} className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color={currentColor}
          bgHoverColor={"gray-200"}
          size="2xl"
          borderRadius="50%"
          close={() => close()} bgColor={''} text={''} width={''}        
        />
      </div>
      <div className="border-b-[1px] border-gray-200 dark:border-gray-700 w-full " />
      <div className="flex gap-5 items-center border-color border-b-1 py-6 px-4 hover:bg-gray-200 dark:hover:bg-dark-bg-second">
        <img
          className="rounded-full h-20 w-20"
          src={"https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"}
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">Oussama AFTYS</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">@ousssamaft</p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">oussamaaftys@gmail.com</p>
        </div>
      </div>
      <div className="border-b-[1px] dark:border-gray-700  border-gray-200 w-full" />
      <div className="grid grid-cols-2 p-2 gap-2">
        {userProfileData.map((item, index) => (
          <div key={index} className="flex items-center  gap-2 p-2 hover:bg-gray-200 dark:hover:bg-dark-bg-second rounded-full border-b-[1px] border-t-[1px] dark:border-gray-700  border-gray-200 cursor-pointer">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-sm rounded-full p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>
            <p className=" text-sm dark:text-gray-200">{item.title}</p>
          </div>
        ))}
        <div  className="flex items-center  gap-2 p-2 hover:bg-gray-200 dark:hover:bg-dark-bg-second rounded-full border-b-[1px] border-t-[1px] dark:border-gray-700  border-gray-200 cursor-pointer">
          <button
            type="button"
            style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }}
            className="text-sm rounded-full p-3 hover:bg-light-gray"
          >
            <HiLogout />
          </button>
          <p className="text-sm dark:text-gray-200">logout</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
