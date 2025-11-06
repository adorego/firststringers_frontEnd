'use client'

import { getChatResponse } from "@/utils/chat-gpt";
import { reStart_userSession } from "@/utils/session";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface Message{
    role: 'bot' | 'user';
    content:string;
}

export default function PreRegisterChat(){
    const turn = useRef(1);//0 bot
    const [messages, setMessage] = useState<Message[]>([]);
    const [input, setInput] = useState('Write your message');
    const startedRef = useRef(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        const startConversation = async () => {
            reStart_userSession();
            const newMessage: Message = { role: 'user', content: "Hello" };
            const response = await getChatResponse(newMessage.content);
            if(response){
                setMessage(prev => [...prev, { role: 'bot', content: response }])
            }
        };

        startConversation();
    }, []);

    const handleSend = async () => {
        if(!input.trim()) return;

        const newMessage: Message = {role:'user', content: input};
        setMessage(prev=>[...prev, newMessage]);
        setInput('');
        turn.current = 0;
        const response:string|null = await getChatResponse(newMessage.content);
        setTimeout(()=>{
            if(response){
                setMessage(prev=>[
                    ...prev,
                    {role:'bot',content:response?.replace(/\r\n/g, '\n').trim() ?? ''}
                ])
            }
        },1000);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };

    return(
        <div className="w-full px-4 my-8 sm:px-6 md:px-8">
            {/* Contenedor principal del chat: columna con altura fija */}
            <div className="w-full md:max-w-[60%] mx-auto flex flex-col">
                <div className="rounded-xl">
                    {/* Área de mensajes: altura fija + scroll + padding bottom grande */}
                    <div
                        className="h-[40vh] overflow-y-auto p-0 space-y-4 pb-24"
                    >
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${
                                    msg.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-xl w-full text-sm prose max-w-none whitespace-pre-line ${
                                        msg.role === "user"
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-800"
                                    }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {/* Sentinel para el scroll, con espacio extra */}
                        <div ref={bottomRef} className="h-4" />
                    </div>

                    {/* Input abajo (sticky) */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="sticky bottom-0 mt-2"
                    >
                        <div className="flex items-center gap-2 bg-gray-200 rounded-xl">
                            <div className="relative flex-1 bg-gray-200 rounded-xl">
                                <div className="bg-gray-200 rounded-xl overflow-hidden 
                                    focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-inset">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onFocus={()=>setInput("")}
                                        onBlur={() => {
                                            if (!input.trim()) setInput("Write your message...");
                                        }} 
                                        placeholder="Write your message..."
                                        className="w-full p-3 bg-transparent text-gray-900
                                                border-0 outline-none appearance-none
                                                rounded-none focus:ring-0" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!input?.trim()}
                                    aria-label="Enviar mensaje"
                                    title="Enviar"
                                    className="absolute right-1 top-1/2 -translate-y-1/2
                                            inline-flex items-center justify-center
                                            h-9 w-9 rounded-full bg-blue-600 text-white
                                            cursor-pointer hover:bg-blue-700 hover:scale-105
                                            transition transform duration-150
                                            disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex flex-col text-center mt-4 pb-0 mx-2">
                <motion.p>
                    If you’re under 18, make sure you have parental or guardian consent. You
                    need to be 13+ to join.
                </motion.p>
            </div>
        </div>
    )
}
