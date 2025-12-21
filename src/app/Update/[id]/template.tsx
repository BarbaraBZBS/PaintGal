import * as motion from "motion/react-client";

export default function Template ({children} : {children: React.ReactNode}) {
    
    return (
        <motion.div initial={{x: 30, opacity: 0}} animate={{x: 0, opacity: 1 }} transition={{ease: "easeInOut", duration: 0.4}}>
        {children}
        </motion.div>
    )
}