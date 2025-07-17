import { AnimatePresence, motion } from "framer-motion";

export interface ErrorProps{
    message:string;
}
export function ErrorDialog({message}:ErrorProps){
 return(
    <AnimatePresence>
        {message && (
            <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md text-sm mt-2"
            >
            {message}
            </motion.div>
        )}
    </AnimatePresence>
 )
}