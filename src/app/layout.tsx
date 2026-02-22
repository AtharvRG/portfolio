import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import WebGLBackground from "@/components/canvas/WebGLBackground";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { LoadProvider } from "@/context/LoadContext";
import Preloader from "@/components/ui/Preloader";
import ScrollOverlay from "@/components/ui/ScrollOverlay";
import CustomCursor from "@/components/ui/CustomCursor";

// 1. Primary Display Font (Massive, Wide)
const oneMore = localFont({
  src: "./fonts/TbjOneMore.ttf",
  variable: "--font-one-more",
  display: "swap",
});

// 2. Secondary Font (Clean, UI, Paragraphs)
const gambio = localFont({
  src: "./fonts/GcGambioSans.ttf",
  variable: "--font-gambio",
  display: "swap",
});

// 3. Accent Font (Elegant, Italic Serifs)
const onceAfter = localFont({
  src: [
    { path: "./fonts/GconceafterRegular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/GconceafterItalic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-once-after",
  display: "swap",
});

const agno = localFont({
  src: "./fonts/Agnotech.ttf",
  variable: "--font-agno",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atharv.is-a-good.dev"),
  title: "Atharv | Creative Developer",
  description: "A digital portfolio.",
  openGraph: {
    title: "Atharv | Creative Developer",
    description: "A digital portfolio.",
    url: "https://atharv.is-a-good.dev",
    siteName: "Atharv's Portfolio",
    locale: "en_IN",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv | Creative Developer",
    description: "A digital portfolio.",
    creator: "@AGachchi",
    site: "@AGachchi",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Added cursor-none to hide default mouse */}
      <body className={`${gambio.className} ${oneMore.variable} ${gambio.variable} ${onceAfter.variable} ${agno.className} `}>
        <LoadProvider>
          <SmoothScroll>
            <Preloader />
            <WebGLBackground />
            <ScrollOverlay /> {/* <--- ADD IT HERE */}
            <CustomCursor />
            <main className="relative z-10 w-full min-h-screen">
              {children}
            </main>
          </SmoothScroll>
        </LoadProvider>
      </body>
    </html>
  );
}