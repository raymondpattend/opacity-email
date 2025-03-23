import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import Image from "next/image";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "opacity.email",
  description: "securely mask your email address for free",
  openGraph: {
    images: [
      {
        url: "https://opacity-email.s3.amazonaws.com/cdn/og.png",
        width: 1200,
        height: 630,
        alt: "opacity.email",
      }
    ]
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Tracking via umami */}
        <script defer src="https://cloud.umami.is/script.js" data-website-id="f9557c9a-5545-4b7d-bb21-74081842d89c"></script>
      </head>
      <body
        className={`${geistSans.variable} antialiased bg-black`}
      >
        <div className="flex justify-center items-center max-w-screen overflow-hidden h-screen lg:rounded-none rounded-xl">
          <Image
            placeholder="blur"
            blurDataURL="data:image/png;base64,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"
            src="/image.webp"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
          />
          <div className="relative gap-y-5 bg-white/10 overflow-x-clip flex flex-col w-full xl:max-w-[60%] lg:max-w-[80%] max-w-full h-full lg:h-[50%] backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-lg z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
