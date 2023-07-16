import { BsFillPersonFill, BsShield } from 'react-icons/bs';
import { AiOutlineSetting } from 'react-icons/ai'
import { LuLayoutDashboard } from 'react-icons/lu'
import { BsInboxes } from 'react-icons/bs'
import { FaRegUser } from 'react-icons/fa'
import { BsCalendarEvent} from 'react-icons/bs'
import { BiSearchAlt2 } from 'react-icons/bi'
import { AiOutlineBarChart } from 'react-icons/ai'
import { AiOutlineFolderOpen } from 'react-icons/ai'

export const sidebarLinks = [
    { title: "Dashboard", icon: <LuLayoutDashboard /> },
    { title: "Inbox", icon: <BsInboxes /> },
    { title: "Accounts", icon: <FaRegUser /> },
    { title: "Schedule ", icon: <BsCalendarEvent /> },
    { title: "Search", icon: <BiSearchAlt2 /> },
    { title: "Analytics", icon: <AiOutlineBarChart /> },
    { title: "Files ", icon: <AiOutlineFolderOpen /> },
    { title: "Setting", icon: <AiOutlineSetting /> },
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


