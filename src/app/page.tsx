import OnBoarding from "@/components/onboarding";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>First Stringers – Athletic Discovery & Development</title>
        <meta name="description" content="Join First Stringers: the AI-powered platform for athlete growth, recruitment and mentorship." />
        <meta name="keywords" content="athletes, recruitment, sports, development, mentorship, First Stringers" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="First Stringers" />
        <meta property="og:description" content="Join First Stringers and take your athletic career to the next level." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:type" content="website" />
      </Head>
      <OnBoarding />
    </>
    
  );
}
