'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";


const fullText =
    "The AI-powered social network for athlete development, discovery, and recruitment.".toUpperCase();
    

export default function OnBoarding(){
    const [displayedText, setDisplayedText] = useState("");
    const [step,setStep] = useState(1);
    const step2Text = "STARTS WITH YOU";
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef2 = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef3 = useRef<NodeJS.Timeout | null>(null);
    const delay = 3000;
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            let index = 0;
            intervalRef.current = setInterval(() => {
            index++;
            if (index <= fullText.length) {
                setDisplayedText(fullText.substring(0, index));
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                timeoutRef2.current = setTimeout(() => {
                setStep(2);
                setDisplayedText(step2Text);
                timeoutRef3.current = setTimeout(() => {
                    setStep(3);
                }, 5000);
                }, 3000);
            }
            }, 100);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
            if (timeoutRef3.current) clearTimeout(timeoutRef3.current);
        };
    }, []);

    useEffect(()=>{
        console.log("step",step);
    },[step])

    const handlePreRegister = ()=>{
        router.push('pre-register');
    }
    return(
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-center text-center px-4">
                <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 3, ease: "easeOut" }}
                className={`w-60 h-60 md:w-64 md:h-64 relative mx-auto ${step !== 1 ? "hidden" : ""}`}
                >
                    <Image
                        src="/dark_logo.png"
                        alt="Logo"
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                        />

                </motion.div>
                {step == 1 && (
                        <h1
                            className="text-sm md:text-xl lg:text-2xl font-bold"
                        >
                            {displayedText}
                        </h1>
                )}
                <AnimatePresence>
                    
                    {step !== 1 && (
                        <motion.h1
                            key="animated-h1"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`text-sm md:text-2xl lg:${
                            step === 2 ? "text-4xl" : "text-3xl"
                            } font-bold`}
                        >
                            {displayedText}
                        </motion.h1>
                    )}

                    {step === 3 && (
                        <div
                            className="mx-auto"
                        >
                            <motion.button
                            onClick={handlePreRegister}
                            key="animated-button"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                                className="bg-black text-white rounded-[10px] px-4 py-2 mt-4 mb-4 hover:cursor-pointer"
                            >
                                Join the Waitlist
                            </motion.button>
                            <motion.p
                                key="animated-p"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="px-auto"
                            
                            >
                                You’re securing your spot in First Stringers Beta.
                                Over 2,000 athletes already signed up.
                            </motion.p>
                        </div>    
                    )}
                </AnimatePresence>
            </div>
                
        </>
    )
}