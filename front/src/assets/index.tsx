import { BsFillPersonFill, BsShield ,BsBarChartLine,BsActivity} from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai'
import { IoMdBusiness } from 'react-icons/io'
import { BsInboxes } from 'react-icons/bs'
import { MdOutlinePlace } from 'react-icons/md'
import { VscTypeHierarchySub } from 'react-icons/vsc'
import { AiOutlineBarChart,AiOutlineCalendar,AiOutlineNotification } from 'react-icons/ai'
import {RiLogoutCircleRLine} from 'react-icons/ri'


export const sidebarLinks = [
    { title: "Businesses", icon: <IoMdBusiness /> ,link:'/businesses'},
    { title: "Placements", icon: <BsInboxes /> ,link:'/placements'},
    { title: "Schedules", icon: <AiOutlineCalendar />,link:'/schedules' },
    { title: "Advertisers ", icon: <AiOutlineNotification /> ,link:'/advertisers'},
    { title: "Locations", icon: <MdOutlinePlace /> ,link:'/locations'},
    { title: "Campaigns", icon: <AiOutlineBarChart />,link:'/campaigns' },
    { title: "Business types ", icon: <VscTypeHierarchySub /> ,link:'/types'},
    { title: "Business activities", icon: <BsActivity /> ,link:'/activities'},
    { title: "Parameters", icon: <AiOutlineSetting /> ,link:'/parameters'},
    { title: "Tracking", icon: <BsBarChartLine /> ,link:'/tracking'},
    { title: "Logout", icon: <RiLogoutCircleRLine /> ,link:'/logout'},
  ];


export const notifData = [
  {
    "id": "1",
    "title": "Nouvel article publié",
    "message": "Un nouvel article intitulé 'Introduction à React' a été publié par John Doe.",
    "timestamp": "2023-07-11T12:37:00Z"
  },
  {
    "id": "2",
    "title": "Nouveau commentaire",
    "message": "John Doe a commenté votre article 'Introduction à React'.",
    "timestamp": "2023-07-09T14:15:00Z"
  },
  {
    "id": "3",
    "title": "Abonné(e) à votre blog",
    "message": "Jane Smith s'est abonné(e) à votre blog.",
    "timestamp": "2023-07-08T18:45:00Z"
  }
]

export const userProfileData = [
  {
    icon: <BsFillPersonFill />,
    title: 'My Profile',
    desc: 'Account Settings',
    iconColor: '#03C9D7',
    iconBg: '#E5FAFB',
  },
  {
    icon: <BsShield />,
    title: 'My Inbox',
    desc: 'Messages & Emails',
    iconColor: 'rgb(0, 194, 146)',
    iconBg: 'rgb(235, 250, 242)',
  },
  {
    icon: <AiOutlineSetting />,
    title: 'Settings',
    desc: 'To-do and Daily Tasks',
    iconColor: 'rgb(255, 244, 229)',
    iconBg: 'rgb(254, 201, 15)',
  },
];


