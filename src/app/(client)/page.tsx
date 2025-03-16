import Form from "@/components/form";
import Link from "next/link";

export default async function Home() {


  return (
    <>
      <div className="flex flex-col gap-0">
        <h2 className="text-white text-xl font-semibold">opacity.email</h2>
        <p className="text-white/80">securely mask your email address for free</p>
      </div>

        <Form/>

      <div className="flex gap-4 w-full mt-auto text-sm"> 
        {/* <Link href="/how-it-works" className="border border-white/20 hidden lg:block hover:bg-black/40 transition-all duration-300 cursor-pointer bg-black/60 text-white p-2 px-5 rounded-xl ">how does it work</Link> */}
        <Link href="/legal/terms" className="border border-white/20 hover:bg-black/40 ml-auto transition-all duration-300 cursor-pointer bg-black/60 text-white p-2 px-5 rounded-xl">terms of service</Link>
        <Link href="/legal/privacy" className="border border-white/20 hover:bg-black/40 transition-all duration-300 cursor-pointer bg-black/60 text-white p-2 px-5 rounded-xl">privacy policy</Link>
      </div>
    </>
  );
}
