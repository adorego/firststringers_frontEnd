import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer(){
    return(
        <div className="bg-primary w-full h-[67px] lg:h-[97px] flex justify-between items-center px-4">
            <div className="flex gap-x-4 items-center justify-center">
                <Link href="/privacy-policy" className="hover:underline">
                    Privacy
                </Link>
                <Link href="/term" className="hover:underline">
                Terms
                </Link>
                {/* <Link href="/faq" className="hover:underline">
                FAQ's
                </Link> */}
                <Link href="https://www.instagram.com/firststringers/" target="_blank">
                    <FaInstagram className="w-6 h-6 hover:text-pink-400" />
                </Link>
                <Link href="https://www.linkedin.com/company/firststringers/posts/?feedView=all" target="_blank">
                    <FaLinkedin className="w-6 h-6 hover:text-blue-400 transition-colors" />
                </Link>
                <Link href="https://www.youtube.com/@firststringers" target="_blank">
                    <FaYoutube className="w-6 h-6 hover:text-red-500 transition-colors" />
                </Link>
            </div>
            <div className="flex">
                <Link href="/" target="_blank">
                    2025 First Stringers Inc.
                </Link>
            </div>
            
        </div>
    )
}