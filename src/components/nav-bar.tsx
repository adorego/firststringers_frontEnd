'use client'

import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
  

  return (
    <header className="bg-primary w-full h-[67px] lg:h-[90px] flex items-start">
      
        <Link href={"/"} className="block">
          <div className="relative w-[180px] h-[60px] lg:w-[220px] lg:h-[90px]">
            <Image
              src="/dark_logo.png"
              alt="Logo"
              fill
              sizes="100vw"
              className="object-contain block"
              priority
            />
          </div>
        
        </Link>
    </header>
    
  )
}