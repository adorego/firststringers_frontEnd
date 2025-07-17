'use client'

import Image from "next/image";
import Link from "next/link";


export default function Navbar() {
  

  return (
    <nav className="bg-primary w-full h-[67px] lg:h-[97px]">
      <div className="mx-4 flex items-center justify-between px-2">
        <Link href={"/"}>
          <div className="z-40 relative w-[128px] h-[56px] lg:w-[198px] lg:h-[87px]">
            <Image
              src="/dark_logo.png"
              alt="Logo"
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        
        </Link>
    </div>
    </nav>
    
  )
}