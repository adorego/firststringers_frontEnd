import axios from 'axios';
import { getOrCreateUserSessionId } from './session';
interface ChatRequestDto {
  prompt: string;
  model?: string;
}

export async function getChatResponse(message:string):Promise<string | null>{
    const url = process.env.NEXT_PUBLIC_FS_BACKEND_URL;
    console.log("url:",url);
    const data:ChatRequestDto = {
        prompt:message,
        model:'gpt-4o'
    }
    const body = {
        data:data,
        userSession:getOrCreateUserSessionId()
    }
    
    if(url){
        try{
            console.log("url:",url);
            const response =  await axios.post(url,body);
            console.log("Respuesta:",response);
            return response.data.response as string;
        }catch(e){
            console.log("Error al llamar al servidor:", e);
        }
        
    }
    return null;
}