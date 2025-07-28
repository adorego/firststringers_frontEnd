'use client'

import { getChatResponse } from "@/utils/chat-gpt";
import { reStart_userSession } from "@/utils/session";
import { useEffect, useRef, useState } from "react";

interface Message{
    role: 'bot' | 'user';
    content:string;
}


export default function PreRegisterChat(){
    const turn = useRef(1);//0 bot
    const [messages, setMessage] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const startedRef = useRef(false);

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
        if(response){
            setMessage(prev=>[...prev,{role:'bot',content:response}])
        }
        


    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleSend();
    };
    

    return(
        <>
            <h1 className="w-full mx-auto flex justify-center p-4">First Stringers Pre-Registration Mentor</h1>
            <div className="w-full max-w-2xl h-[80vh] mx-auto border rounded-xl shadow-lg flex flex-col bg-white">
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                >
                    <div
                className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                    msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
                >
                {msg.content}
                </div>
                </div>
                ))}
                </div>

                {/* Input */}
                <div className="p-4 border flex gap-2">
                    <input
                    type="text"
                    placeholder="Write your message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-2 border-[4px] rounded-full text-sm focus:outline-none focus:ring-0 focus:ring-blue-500 text-gray-800  placeholder-gray-600"
                    />
                    <button
                    onClick={handleSend}
                    className="bg-[var(--foreground)] hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm"
                    >
                        Send
                    </button>
                </div>
            </div>
        </>
        
    )

}