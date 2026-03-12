"use client";

import { Link } from "@heroui/link";
import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { name: "HOME", href: "/" },
    { name: "MODULES", href: "/modules" },
    { name: "EVENT_DETAILS", href: "/event-details" },
    { name: "CONTACT_US", href: "/contact-us" },
    { name: "REGISTER_NOW", href: "/register" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
      href: "https://www.facebook.com/DevelopersDay",
    },
    {
      name: "Instagram",
      icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
      href: "https://www.instagram.com/developersday/",
    },
    {
      name: "LinkedIn",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      href: "https://www.linkedin.com/company/developersday/",
    },
    // {
    //   name: "Twitter",
    //   icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    //   href: "#",
    // },
  ];

  const developerCrew = [
    {
      name: "Owais Rafiq",
      href: "https://www.linkedin.com/in/owais-rafiq-639494253/",
    },
    {
      name: "Arham Alvi",
      href: "https://pk.linkedin.com/in/arham-alvi-62068b1bb",
    },
    {
      name: "Shareeq Rashid",
      href: "https://pk.linkedin.com/in/shareeq-rashid",
    },
  ];

  const designCrew = [
    {
      name: "Asjad Bin Rehan",
      href: "https://www.linkedin.com/in/asjad-bin-rehan-a820532a6/",
    },
    {
      name: "Sameed Jamal",
      href: "https://www.linkedin.com/in/sameed-jamal/",
    },
    {
      name: "Hassan Sami",
      href: "https://www.linkedin.com/in/hasan-sami/",
    },
    {
      name: "Wareesha Faheem",
      href: "https://www.linkedin.com/in/wareesha-faheem/",
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-[#392828]">
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14 lg:py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-10 lg:gap-14 items-start">
          {/* Brand / description / nav / social */}
          <div className="flex flex-col gap-6">
            {/* Brand */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="relative h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-sm bg-red-primary/10 border border-red-primary/60">
                <Image
                  alt="DevDay Logo"
                  className="object-contain"
                  height={36}
                  src="/logo.png"
                  width={36}
                />
              </div>
              <div>
                <p className="text-[0.7rem] sm:text-xs font-mono tracking-[0.28em] text-gray-400 uppercase">
                  DEVELOPER_EVENT
                </p>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-[0.22em] uppercase">
                  DEVDAY &apos;26
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0">
              DevDay&apos;26 is a high-intensity, developer-first competition
              where teams design, build, and ship under pressure — spanning
              software, hardware, and AI modules.
            </p>

            {/* Nav + social */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <nav className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.name}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-[0.8rem] font-mono tracking-[0.12em]"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex justify-center sm:justify-end gap-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    aria-label={social.name}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-800 text-gray-400 hover:text-white hover:border-red-primary transition-colors"
                    href={social.href}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Developers panel */}
          <div className="rounded-md border border-[#392828] bg-[#111111] px-4 py-4 sm:px-5 sm:py-5 lg:ml-auto max-w-md w-full">
            <p className="text-[0.65rem] sm:text-xs font-mono tracking-[0.24em] text-gray-500 uppercase mb-3">
              ABOUT_THE_TEAM
            </p>
            <div className="space-y-4 text-xs sm:text-sm text-gray-200">
              <div>
                <p className="font-mono space-y-4 text-xs sm:text-sm text-gray-200 mb-1 tracking-[0.18em] uppercase">
                  DEVELOPMENT CREW
                </p>
                <p className="leading-relaxed">
                  {developerCrew.map((dev, index) => (
                    <span key={dev.name}>
                      {index > 0 && <span className="mx-1">·</span>}
                      <Link
                        className="underline-offset-4 hover:underline hover:text-red-primary transition-colors space-y-4 text-xs sm:text-sm text-gray-400 mb-1 tracking-[0.18em]"
                        href={dev.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {dev.name}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <p className="font-mono space-y-4 text-xs sm:text-sm text-white mb-1 tracking-[0.18em] uppercase">
                  DESIGN CREW
                </p>
                <p className="leading-relaxed">
                  {designCrew.map((dev, index) => (
                    <span key={dev.name}>
                      {index > 0 && <span className="mx-1">·</span>}
                      <Link
                        className="underline-offset-4 hover:underline hover:text-red-primary transition-colors space-y-4 text-xs sm:text-sm text-gray-400 mb-1 tracking-[0.18em]"
                        href={dev.href}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {dev.name}
                      </Link>
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-gray-500 text-[0.65rem] sm:text-xs text-center md:text-left">
            © 2025 DevDay&apos;26. All rights reserved.
          </p>
          <p className="text-gray-600 text-[0.6rem] sm:text-[0.7rem] text-center md:text-right font-mono uppercase tracking-[0.16em]">
            BUILT BY THE DEVDDAY&apos;26 TECH TEAM
          </p>
        </div>
      </div>
    </footer>
  );
}
