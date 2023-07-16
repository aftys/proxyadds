import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Button';
import { MdOutlineCancel } from 'react-icons/md';
import { notifData } from '../../../assets';
import moment from 'moment';
import NotifSkeleton from '../../Skeleton/NotifSkeleton';

interface NotificationProps {
  close: () => void;
}

const Notification: React.FC<NotificationProps> = ({ close }) => {
  const currentColor = "#10b981";
  
  return (
    <motion.div
      className="nav-item z-40  fixed border-[1px] right-4 top-[60px] h-[500px] bg-white dark:bg-dark-bg-main  dark:border-gray-700 rounded-xl notif-container"
      animate={{ y: 0, opacity: 1, transition: { default: { duration: 1, ease: [0, 0.71, 0.2, 1.01] } } }} initial={{ y: +60, opacity: 0 }} exit={{ y: -60, opacity: 0 }}
    >
      <div className="sticky top-0 flex justify-between items-center px-4 bg-white dark:bg-dark-bg-main border-b-[1px] border-gray-200 dark:border-gray-700">
        <p style={{ color: currentColor }} className="font-semibold text-lg dark:text-gray-200">Notifications</p>
        <Button
          icon={<MdOutlineCancel />}
          color={currentColor}
          bgHoverColor={"gray-200"}
          size="2xl"
          borderRadius="50%"
          close={() => close()} bgColor={''} text={''} width={''}        />
      </div>

      <div className=" w-full flex flex-col items-start justify-around">
        {notifData?.map((item, index) => (
          <div key={index}>
            <div className="flex items-start gap-5 p-3 leading-8 cursor-pointer hover:bg-[rgba(0,0,0,0.1)] dark:hover:bg-dark-bg-second w-full border-b-[1px] border-gray-200 dark:border-gray-700 ">
              <img
                className="rounded-full h-10 w-10"
                src={"https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"}
                alt={item.title}
              />

              <div className='w-[250px]'>
                <p className="font-semibold text-sm dark:text-gray-400 ">{item.title}</p>
                <p className="text-gray-500 dark:text-gray-200 text-sm">{item.message}</p>
                <p className="text-[#10b981] text-xs">
                  {moment(item.timestamp).fromNow()}
                </p>
              </div>
            </div>
          </div>
        ))}
        <NotifSkeleton />
        <NotifSkeleton />
        <NotifSkeleton />
        <NotifSkeleton />
      </div>
    </motion.div>
  );
};

export default Notification;
