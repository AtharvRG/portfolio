// src/app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import { DM_Serif_Display, EB_Garamond, Lato, Roboto_Flex } from "next/font/google";
import "./globals.css";

const NeueFont = localFont({
  src: [
    { path: '../fonts/NeueMetanaNext-Black.otf', weight: '500' },
    { path: '../fonts/NeueMetanaNext-SemiBold.otf', weight: '300' },
  ],
  variable: '--font-neue',
});

const MayesFont = localFont({
  src: [
    { path: '../fonts/Mayes-Black.otf', weight: '900' },
    { path: '../fonts/Mayes-Bold.otf', weight: '700' },
    { path: '../fonts/Mayes-ExtraBold.otf', weight: '800' },
    { path: '../fonts/Mayes-Medium.otf', weight: '500' },
    { path: '../fonts/Mayes-Regular.otf', weight: '400' },
    { path: '../fonts/Mayes-SemiBold.otf', weight: '600' },
  ],
  variable: '--font-mayes',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-dm-serif',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});

// Configure EB Garamond for body text
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-eb-garamond',
});

const ppn = localFont({
  src: '../fonts/ppneuebit-Bold.otf',
  variable: '--font-ppn',
});

const danceFont = localFont({
  src: '../fonts/DancingScript-Bold.otf',
  variable: '--font-dance',
});

const verFont = localFont({
  src: '../fonts/Vercetti-Regular.otf',
  variable: '--font-ver',
});

const wistleFont = localFont({
  src: '../fonts/Wistleserif-Regular.otf',
  variable: '--font-wistle',
});

const harmondFont = localFont({
  src: '../fonts/Harmond-SemBdItaCond.otf',
  variable: '--font-harmond',
});

const gothamFont = localFont({
  src: '../fonts/Gotham-Bold.otf',
  variable: '--font-gotham',
});

const NuraFont = localFont({
  src: [
    { path: '../fonts/Nura Black.otf', weight: '900' },
    { path: '../fonts/Nura Bold.otf', weight: '700' },
    { path: '../fonts/Nura ExtraBold.otf', weight: '800' },
    { path: '../fonts/Nura ExtraLight.otf', weight: '200' },
    { path: '../fonts/Nura Light.otf', weight: '300' },
    { path: '../fonts/Nura Medium.otf', weight: '500' },
    { path: '../fonts/Nura Normal.otf', weight: '400' },
    { path: '../fonts/Nura SemiBold.otf', weight: '600' },
    { path: '../fonts/Nura Thin.otf', weight: '100' },
  ],
  variable: '--font-nura',
});

export const metadata: Metadata = {
  title: "Atharv R Gachchi | Creative Developer",
  description: "Portfolio of Atharv R Gachchi, shaping the future of the web with intention.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={` ${lato.variable} ${ebGaramond.variable} ${gothamFont.variable} ${wistleFont.variable} ${NeueFont.variable} ${MayesFont.variable} ${NuraFont.variable} ${dmSerif.variable} ${ppn.variable} ${verFont.variable} ${danceFont.variable} ${harmondFont.variable}`}> 
      <body>{children}</body>
    </html>
  );
}