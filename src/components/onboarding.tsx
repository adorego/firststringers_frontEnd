'use client'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});



export default function OnBoarding(){
    const router = useRouter();

    const handlePreRegister = ()=>{
        router.push('pre-register');
    }
    return(
        <div className="flex flex-col items-center justify-center bg-white">
            

        </div>
    )
}