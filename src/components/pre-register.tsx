'use client'

import { getChatResponse } from "@/utils/chat-gpt";
import { reStart_userSession } from "@/utils/session";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Message{
    role: 'bot' | 'user';
    content:string;
}


export default function PreRegisterChat(){
    const turn = useRef(1);//0 bot
    const [messages, setMessage] = useState<Message[]>([]);
    const [input, setInput] = useState('Write your message');
    const startedRef = useRef(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

   useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const startConversation = async () => {
        reStart_userSession();
        const newMessage: Message = { role: 'user', content: "Hello" };
        const response = await getChatResponse(newMessage.content);
        console.log("CGPT response:", response);
        if(response){
            setMessage(prev => [...prev, { role: 'bot', content: response }])
        }
        
    };

    startConversation();
    }, []);

    
    
    const handleSend = async () =>{
        if(!input.trim()) return;

        const newMessage: Message = {role:'user', content: input};
        setMessage(prev=>[...prev, newMessage]);
        setInput('');
        turn.current = 0;
        const response:string|null = await getChatResponse(newMessage.content);
        console.log("CGPT response:", response);
        const timeOutId = setTimeout(()=>{
            if(response){
                setMessage(prev=>[...prev,{role:'bot',content:response?.replace(/\r\n/g, '\n').trim() ?? ''}])
            }
        },1000);
        //clearTimeout(timeOutId);
        
        


    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };
    

    return(
        <>
            <div className="w-full px-4 my-8 sm:px-6 md:px-8">
                <div className="max-w-[60%] mx-auto flex flex-col justify-center">
                    <div className="rounded-xl">
                        {/* Área de mensajes: altura fija + scroll */}
                        <div 
                            ref={chatContainerRef}
                            className="h-[30vh] overflow-y-auto p-6 space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${
                                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    }`}>
                                        <div className={`px-4 py-2 rounded-xl max-w-[75%] text-sm prose max-w-none whitespace-pre-line ${
                                    msg.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-800'}`}>
                                    {msg.content}
                                    </div>
                                </div>
                            ))}
                    </div>
                    {/* Input abajo */}
                    <div className="p-4 border-gray-200">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onClick={e =>setInput("")}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Write your message..."
                                className="flex-1 p-3 rounded-lg bg-gray-200 border border-gray-600 text-gray focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        
                        </div>
                    </div>
                </div>
              </div>  

                
                <div className="flex flex-col text-center mt-4 pb-0 ">
                    <motion.h2 className="text-3xl">
                        Starts with you
                    </motion.h2>
                    <motion.p>
                        Join First Stringers early to get priority access when we go live.
                    </motion.p>
                </div>
                
          </div>
        </>
        
    )

}