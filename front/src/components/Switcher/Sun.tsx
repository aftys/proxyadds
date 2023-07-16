import { motion } from 'framer-motion'

export default function Sun() {
    const animationVariants = {
        start: {
            rotate: 0,
        },
        end: {
            rotate: 360,
        },
    };

    const animationTransition = {
        duration: 0.5,
    };
    return (
        <motion.svg
            initial="start"
            animate="end"
            variants={animationVariants}
            className='absolute left-1 top-1 z-30'
            transition={animationTransition}
            width="25" height="25" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="fill-[#10b981]" d="M9.82406 16.0003C9.82406 19.6817 12.8187 22.6763 16.5001 22.6763C20.1814 22.6763 23.1761 19.6817 23.1761 16.0003C23.1761 12.319 20.1814 9.32433 16.5001 9.32433C12.8187 9.32433 9.82406 12.319 9.82406 16.0003ZM16.5001 11.991C18.7107 11.991 20.5094 13.7897 20.5094 16.0003C20.5094 18.211 18.7107 20.0097 16.5001 20.0097C14.2894 20.0097 12.4907 18.211 12.4907 16.0003C12.4907 13.7897 14.2894 11.991 16.5001 11.991ZM15.1641 25.3337H17.8307V29.3337H15.1641V25.3337ZM15.1641 2.66699H17.8307V6.66699H15.1641V2.66699ZM3.16406 14.667H7.16406V17.3337H3.16406V14.667ZM25.8307 14.667H29.8307V17.3337H25.8307V14.667ZM6.1254 24.4843L8.95206 21.655L10.8387 23.5403L8.01206 26.3697L6.1254 24.4843ZM22.1534 8.45899L24.9827 5.62966L26.8681 7.51499L24.0387 10.3443L22.1534 8.45899ZM8.95606 10.3457L6.12673 7.51633L8.0134 5.63099L10.8401 8.46032L8.95606 10.3457ZM26.8681 24.4857L24.9827 26.371L22.1534 23.5417L24.0387 21.6563L26.8681 24.4857Z" fill="#FAFAFA" />
        </motion.svg>
    )
}