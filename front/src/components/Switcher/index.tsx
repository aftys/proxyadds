import { motion } from 'framer-motion'
import Sun from './Sun'
import Moon from './Moon'
import { useStateContext } from '../../contexts'

const spring = {
    type: "spring",
    damping: 30,
    duration:2
};

export default function Switcher() {
    const {darkMode,toggleDarkMode}=useStateContext()
    return (
        <motion.div data-ison={darkMode} onClick={toggleDarkMode} className='flex w-[60px] h-[34px] p-2 relative justify-between switcher rounded-3xl bg-gray-200 dark:bg-dark-trans  p-[1px]'>
            {darkMode ? (
                <Moon />
            )
                :
                (
                    <Sun />
                )
            }
            <motion.div className="w-[34px] h-full bg-white dark:bg-blue-950 rounded-[40px]" layout transition={spring} />
        </motion.div>
    )
}