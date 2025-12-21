import * as motion from "motion/react-client";

export default function Template ({children} : {children: React.ReactNode}) {
    
    return (
        <motion.div layout initial={{y: 30, opacity: 0}} animate={{y: 0, opacity: 1 }} transition={{ease: "easeInOut", duration: 0.5, type: "spring", stiffness: 100}} >
        {children}
        </motion.div>

    )
}
