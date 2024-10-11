import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { classNames } from "@/shared/lib/helpers/classNames";
import Script from "next/script";
import { RootProvider } from "./_providers";
import { Header } from "@/widgets/header/ui/Header";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Boops NFT App",
  description: "NFT One click Factory",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'cyan' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  maximumScale: 1,
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "h-screen flex flex-col relative"
        )}
      >
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script>
        <RootProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <footer></footer>
        </RootProvider>
      </body>
    </html>
  );
}
