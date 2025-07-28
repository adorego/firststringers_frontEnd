import PreRegister from "@/components/pre-register";
import Head from "next/head";


export default function Page(){
    return(
        <>
            <Head>
                <title>First Stringers Pre-Registration</title>
                <meta name="description" content="Join First Stringers through our AI-guided pre-registration chat and start your journey as a young athlete toward discovery and development." />
                <meta name="keywords" content="athletes, recruitment, sports, development, mentorship, First Stringers" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="First Stringers" />
                <meta property="og:description" content="Join First Stringers and take your athletic career to the next level." />
                <meta property="og:image" content="/og-image.png" />
                <meta property="og:type" content="website" />
            </Head>
            <PreRegister />
        </>
        
    )
}