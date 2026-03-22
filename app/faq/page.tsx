import { Metadata } from "next";
import { ComingSoon } from "@/components/global";


/* FOR ASHAR
//ya to chatbot lagana hai yaha yaad rakhna -> for ashar
//time nahi mila to gpt generate kuch questions lagadengay yahan pe
//procom wali db through voyage ai yaad rkhna hai

//langchain wala session bhi hai
//wo bhi use krskte alag say, remember to check render logs


*/
const title = "FAQ";
const description =
  "Frequently Asked Questions regarding Developer's Day 2026.";

export const metadata: Metadata = {


  title,
  description,
  alternates: {
    canonical: "/faq",
  },
  openGraph: {

    
    title,
    description,
    url: "/faq",
    images: [{ url: "/logo-1.png", alt: "Developer's Day 2026 FAQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo-1.png"],
  },
};

export default function FaqPage(){
  return (
    <ComingSoon
      title="FAQ"

      description="FREQUENTLY_ASKED_QUESTIONS._THIS_PAGE_IS_UNDER_CONSTRUCTION."
    />
  );
}
