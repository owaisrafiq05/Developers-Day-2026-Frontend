import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.png",
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
      </body>
    </html>
  );
}
