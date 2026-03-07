"use client";

import ContactCard from "./contact-card";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function ContactUs() {
  const operationalContacts = [
    {
      category: "GENERAL_SECRETARY",
      name: "SHOAIB RAZA",
      phone: "+92 3330201433",
      label: "CALL NOW:",
    },
    {
      category: "DIRECTOR_MARKETING",
      name: "AHMED MIRZA",
      phone: "+92 3361200715",
      label: "CALL NOW:",
    },
    {
      category: "PARTICIPANT_RELATIONS",
      name: "NOMEER AHSAN",
      phone: "+92 3303714539",
      label: "CALL NOW:",
    },
    {
      category: "PARTICIPANT_RELATIONS",
      name: "NOMEER AHSAN",
      phone: "+92 3171008949",
      label: "CALL NOW:",
    },
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

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = async (phone: any, i: any) => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopiedIndex(i);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };
  return (
    <section className="bg-dark-red text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex gap-4 mb-12 md:mb-16"
        >
          <div className="w-1 bg-red-primary flex-shrink-0" />
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              CONTACT_US
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              ESTABLISH CONNECTION FOR COMPETITIONS,
              <br />
              SPONSORSHIPS AND STRATEGIC ALLIANCES.
            </p>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Left Column — cards slide in from left, staggered */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ContactCard title="GENERAL_INQUIRIES">
                <p className="text-gray-400 text-sm mb-6">
                  For competitions, sponsorships and other queries.
                </p>

                <a
                  href="mailto:devday.acm.khi@nu.edu.pk"
                  className="block"
                >
                  <div className="flex items-center gap-3 bg-red-primary p-4 cursor-pointer hover:opacity-90 transition">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <span className="text-white font-mono text-sm">
                      devday.acm.khi@nu.edu.pk
                    </span>
                  </div>
                </a>
              </ContactCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ContactCard
                title="OPERATIONAL_INQUIRIES"
                subtitle="CONNECTION_REQUIRED"
              >
                <div className="space-y-4">
                  {operationalContacts.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.4,
                        delay: 0.2 + index * 0.09,
                        ease: "easeOut",
                      }}
                      className="border-b border-gray-800 pb-4 last:border-0"
                    >
                      <p className="text-gray-500 text-xs font-mono mb-2">
                        {contact.category}
                      </p>

                      <div className="flex justify-between items-center">
                        <p className="text-white text-sm font-bold">
                          {contact.name}
                        </p>

                        <div className="text-right">
                          <p className="text-red-primary text-xs font-mono">
                            {contact.label}
                          </p>

                          <div className="flex items-center justify-end gap-2 mt-1">
                            <p className="text-white text-sm font-mono">
                              {contact.phone}
                            </p>

                            <button
                              onClick={() => handleCopy(contact.phone, index)}
                              className="p-1.5 rounded cursor-pointer bg-gray-800 hover:bg-red-primary transition"
                            >
                              {copiedIndex === index ? (
                                <FiCheck className="text-red-primary w-3.5 h-3.5" />
                              ) : (
                                <FiCopy className="text-gray-500 w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.5, ease: "easeOut" }}
                  className="flex gap-4 mt-6 pt-6 border-t border-gray-800"
                >
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={social.icon} />
                      </svg>
                    </Link>
                  ))}
                </motion.div>
              </ContactCard>
            </motion.div>
          </div>

          {/* Right Column — map slides in from right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ContactCard title="">
              <div className="relative h-[500px] lg:h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.2267634850845!2d67.06073631500238!3d24.88594598403654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sFAST%20NUCES%20Karachi!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
              <div className="mt-4 bg-white text-black p-4">
                <h4 className="font-bold text-lg mb-2">FAST_NUCES_KARACHI</h4>
                <p className="text-sm text-gray-700">
                  ST-4, Sector 17-D, National Highway 5, Karachi City, Sindh,
                  Pakistan
                </p>
              </div>
              <div className="flex gap-4 mt-4">
                <Button
                  as={Link}
                  href="https://maps.google.com"
                  target="_blank"
                  className="bg-red-primary hover:bg-red-700 text-white font-bold text-sm flex-1"
                  radius="none"
                  startContent={
                    <Image
                      src="/icons/location.svg"
                      alt="Location"
                      width={13}
                      height={13}
                    />
                  }
                >
                  OPEN_IN_MAPS
                </Button>
                <Button
                  className="bg-white hover:bg-gray-100 text-black font-bold text-sm flex-1"
                  radius="none"
                  startContent={
                    <Image
                      src="/icons/share.svg"
                      alt="Share"
                      width={20}
                      height={20}
                    />
                  }
                >
                  SHARE_LINK
                </Button>
              </div>
            </ContactCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
