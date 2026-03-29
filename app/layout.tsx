import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import Script from "next/script";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
// @ts-ignore – sonner types may not be available in this project yet
import { Toaster } from "sonner";
import { fontSans } from "@/config/fonts";
import AppNavbar from "@/components/global/navbar";
import Footer from "@/components/global/footer";
import SplashProvider from "@/components/SplashProvider";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.devday26.com";
const isProduction =
  process.env.VERCEL_ENV === "production" || siteUrl === "https://www.devday26.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Developer's Day",
    "DevDay FAST NUCES Karachi",
    "Developers Day FAST",
    "Developers Day",
    "Devday FAST NUCES Karachi",
    "DevDay 2026",
    "FAST NUCES Karachi",
    "FAST NU",
    "FAST University",
    "Developer's Day FAST NUCES Karachi",
    "Coding Competition Pakistan",
    "Hackathon Karachi",
    "Tech Event",
    "Software Engineering",
    "Computer Science",
    "FAST-NUCES",
    "Developers Day 26",
  ],
  robots: {
    index: isProduction,
    follow: isProduction,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/logo-1.png",
        alt: `${siteConfig.name} social preview image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/hero.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <SplashProvider>
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <SmoothScroll>
              <Toaster richColors position="top-right" />
              <div className="relative flex flex-col min-h-screen">
                <AppNavbar />
                <main className="flex-grow">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
            </SmoothScroll>
          </Providers>
        </SplashProvider>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-PH32J132S7" strategy="afterInteractive" />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PH32J132S7');
            `,
          }}
        />
      </body>
    </html>
  );
}
