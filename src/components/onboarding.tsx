'use client'

import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";


export default function OnBoarding(){
    const router = useRouter();

    
    const handlePreRegister = ()=>{
        router.push('pre-register');
    }
    return(
        <>
            <div className="w-full h-[80vh] flex flex-col items-center justify-center text-center px-4">
                <motion.h1 className="text-5xl lg:text-8xl font-extrabold text-center max-w-[80%]">
                    The AI-Powered social network for athletes.
                </motion.h1>
                <motion.button
                            onClick={handlePreRegister}
                            key="animated-button"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="bg-black text-white rounded-[20px] px-6 py-2 mt-4 mb-4 hover:cursor-pointer hover:bg-blue-600"
                            >
                                Join
                </motion.button>
                <motion.p>
                   Join First Stringers early to get priority access when we go live
                </motion.p>
            </div>    
                   
        </>
    )
}
    

                
        
    
