"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import {
  HomeIcon,
  CubeIcon,
  CalendarIcon,
  UserGroupIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  CodeBracketIcon,
  CpuChipIcon,
  CommandLineIcon,
  ComputerDesktopIcon,
  CircleStackIcon,
  FlagIcon,
  BoltIcon,
  PresentationChartBarIcon,
  Squares2X2Icon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  CakeIcon,
  PuzzlePieceIcon,
  UsersIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { CalendarClock, Handshake, ChefHat, UserStar, GamepadDirectional } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";

const modules = [
  { id: "tech-quest", label: "Tech Quest", icon: CpuChipIcon },
  { id: "software-eng", label: "Software Eng", icon: CommandLineIcon },
  { id: "ai-data", label: "AI & Data", icon: CircleStackIcon },
  { id: "dev-design", label: "Dev & Design", icon: ComputerDesktopIcon },
  { id: "coding", label: "Coding", icon: CodeBracketIcon },
  { id: "general", label: "General", icon: FlagIcon },
  { id: "electrical-eng", label: "Electrical Eng", icon: BoltIcon },
  { id: "business", label: "Business", icon: PresentationChartBarIcon },
  { id: "project-xtreme", label: "Project Xtreme", icon: Squares2X2Icon },
];

const eventDetailsItems = [
  { id: "event-itinerary", label: "Event_Itinerary", icon: CalendarClock },
  { id: "job-fair", label: "Job_Fair", icon: Handshake },
  { id: "food-fest", label: "Food_Fest", icon: ChefHat },
  { id: "mini-games", label: "Mini_Games", icon: GamepadDirectional },
];

const ourTeamItems = [
  { id: "our-team", label: "Core_Team", icon: UsersIcon },
  { id: "brand-ambassadors", label: "Brand_Ambassadors", icon: UserStar },
];


export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [isMobileModulesOpen, setIsMobileModulesOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  const [isMobileEventDetailsOpen, setIsMobileEventDetailsOpen] = useState(false);
  const [isOurTeamOpen, setIsOurTeamOpen] = useState(false);
  const [isMobileOurTeamOpen, setIsMobileOurTeamOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const eventDetailsRef = useRef<HTMLDivElement>(null);
  const ourTeamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsModulesOpen(false);
    setIsMobileModulesOpen(false);
    setIsEventDetailsOpen(false);
    setIsMobileEventDetailsOpen(false);
    setIsOurTeamOpen(false);
    setIsMobileOurTeamOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsModulesOpen(false);
      }
      if (eventDetailsRef.current && !eventDetailsRef.current.contains(e.target as Node)) {
        setIsEventDetailsOpen(false);
      }
      if (ourTeamRef.current && !ourTeamRef.current.contains(e.target as Node)) {
        setIsOurTeamOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { name: "HOME", href: "/", icon: HomeIcon },
    { name: "CONTACT_US", href: "/contact-us", icon: EnvelopeIcon },
  ];

  const isEventDetailsActive = eventDetailsItems.some((item) => pathname === `/${item.id}`);
  const isOurTeamActive = ourTeamItems.some((item) => pathname === `/${item.id}`);

  const isModulesActive = pathname.startsWith("/modules");

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="bg-dark-red border-b border-[#382929]"
      maxWidth="xl"
      height="5rem"
      classNames={{
        wrapper: "container mx-auto px-4 md:px-6 h-20",
        item: "text-white data-[active=true]:text-white font-mono",
        menu: "bg-dark-red",
      }}
    >
      {/* Brand */}
      <NavbarContent justify="start">
        <NavbarBrand>
          <Link href="/" className="focus:outline-none">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex items-center gap-2"
            >
              <Image
                src="/logo.png"
                alt="DevDay Logo"
                width={33}
                height={49}
                className="object-contain"
              />
              <p className="font-bold text-white text-lg tracking-[0.18em]">
                DEVDAY &apos;26
              </p>
            </motion.div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Mobile Toggle */}
      <NavbarContent justify="end" className="lg:hidden">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="text-white"
        />
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        <LayoutGroup id="navbar-links">
          {/* HOME */}
          {menuItems.slice(0, 1).map((item) => {
            const isActive = pathname === item.href;
            return (
              <NavbarItem key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 text-sm md:text-base transition-colors font-bold tracking-[0.18em]"
                >
                  {item.name}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavbarItem>
            );
          })}

          {/* MODULES Dropdown */}
          <NavbarItem className="relative" ref={dropdownRef}>
            <button
              onMouseEnter={() => setIsModulesOpen(true)}
              onMouseLeave={() => setIsModulesOpen(false)}
              onClick={() => setIsModulesOpen((v) => !v)}
              className="flex items-center gap-1 cursor-pointer text-white hover:text-gray-200 text-sm md:text-base font-bold tracking-[0.18em] transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isModulesOpen}
            >
              MODULES
              <motion.span
                animate={{ rotate: isModulesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.span>
            </button>

            {isModulesActive && (
              <motion.div
                layoutId="navbar-active-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            {/* Dropdown Panel */}
            <AnimatePresence>
              {isModulesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={() => setIsModulesOpen(true)}
                  onMouseLeave={() => setIsModulesOpen(false)}
                  className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 bg-dark-red border border-[#4a2020] shadow-2xl z-50"
                  style={{ borderRadius: 0 }}
                >
                  {/* Arrow */}
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-red border-l border-t border-[#4a2020] rotate-45" />

                  <div className="py-2">
                    {modules.map((mod, i) => {
                      const Icon = mod.icon;
                      const isActive = pathname === `/modules/${mod.id}`;
                      return (
                        <motion.button
                          key={mod.id}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => {
                            router.push(`/modules/${mod.id}`);
                            setIsModulesOpen(false);
                          }}
                          className={`w-full flex cursor-pointer items-center gap-3 px-5 py-2.5 text-sm font-bold tracking-widest transition-colors text-left
                            ${isActive
                              ? "text-white bg-red-primary/20 border-l-2 border-red-primary"
                              : "text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                            }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {mod.label.toUpperCase()}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </NavbarItem>

          {/* EVENT_DETAILS Dropdown */}
          <NavbarItem className="relative" ref={eventDetailsRef}>
            <button
              onMouseEnter={() => setIsEventDetailsOpen(true)}
              onMouseLeave={() => setIsEventDetailsOpen(false)}
              onClick={() => setIsEventDetailsOpen((v) => !v)}
              className="flex items-center gap-1 cursor-pointer text-white hover:text-gray-200 text-sm md:text-base font-bold tracking-[0.18em] transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isEventDetailsOpen}
            >
              EVENT_DETAILS
              <motion.span
                animate={{ rotate: isEventDetailsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.span>
            </button>

            {isEventDetailsActive && (
              <motion.div
                layoutId="navbar-active-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {isEventDetailsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={() => setIsEventDetailsOpen(true)}
                  onMouseLeave={() => setIsEventDetailsOpen(false)}
                  className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-dark-red border border-[#4a2020] shadow-2xl z-50"
                  style={{ borderRadius: 0 }}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-red border-l border-t border-[#4a2020] rotate-45" />
                  <div className="py-2">
                    {eventDetailsItems.map((item, i) => {
                      const Icon = item.icon;
                      const isActive = pathname === `/${item.id}`;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => {
                            router.push(`/${item.id}`);
                            setIsEventDetailsOpen(false);
                          }}
                          className={`w-full flex cursor-pointer items-center gap-3 px-5 py-2.5 text-sm font-bold tracking-widest transition-colors text-left
                            ${isActive
                              ? "text-white bg-red-primary/20 border-l-2 border-red-primary"
                              : "text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                            }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {item.label.toUpperCase()}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </NavbarItem>

          {/* OUR_TEAM Dropdown */}
          <NavbarItem className="relative" ref={ourTeamRef}>
            <button
              onMouseEnter={() => setIsOurTeamOpen(true)}
              onMouseLeave={() => setIsOurTeamOpen(false)}
              onClick={() => setIsOurTeamOpen((v) => !v)}
              className="flex items-center gap-1 cursor-pointer text-white hover:text-gray-200 text-sm md:text-base font-bold tracking-[0.18em] transition-colors focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isOurTeamOpen}
            >
              OUR_TEAM
              <motion.span
                animate={{ rotate: isOurTeamOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDownIcon className="w-4 h-4" />
              </motion.span>
            </button>

            {isOurTeamActive && (
              <motion.div
                layoutId="navbar-active-underline"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}

            <AnimatePresence>
              {isOurTeamOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={() => setIsOurTeamOpen(true)}
                  onMouseLeave={() => setIsOurTeamOpen(false)}
                  className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-56 bg-dark-red border border-[#4a2020] shadow-2xl z-50"
                  style={{ borderRadius: 0 }}
                >
                  <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-red border-l border-t border-[#4a2020] rotate-45" />
                  <div className="py-2">
                    {ourTeamItems.map((item, i) => {
                      const Icon = item.icon;
                      const isActive = pathname === `/${item.id}`;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          onClick={() => {
                            router.push(`/${item.id}`);
                            setIsOurTeamOpen(false);
                          }}
                          className={`w-full flex cursor-pointer items-center gap-3 px-5 py-2.5 text-sm font-bold tracking-widest transition-colors text-left
                            ${isActive
                              ? "text-white bg-red-primary/20 border-l-2 border-red-primary"
                              : "text-gray-300 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                            }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          {item.label.toUpperCase()}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </NavbarItem>

          {/* Remaining items (CONTACT_US) */}
          {menuItems.slice(1).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <NavbarItem key={item.name} className="relative">
                <Link
                  href={item.href}
                  className="text-white hover:text-gray-200 text-sm md:text-base transition-colors font-bold tracking-[0.18em]"
                >
                  {item.name}
                </Link>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-red-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </NavbarItem>
            );
          })}
        </LayoutGroup>
      </NavbarContent>

      {/* Register Button - Desktop */}
      <NavbarContent justify="end" className="hidden lg:flex">
        <NavbarItem>
          <Button
            as={Link}
            href="/register"
            className="bg-red-primary hover:bg-red-700 text-lg text-white font-bold gap-10 px-8"
            radius="none"
          >
            REGISTER_NOW
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-dark-red pt-6 flex flex-col items-center pb-10">
        {/* HOME */}
        {menuItems.slice(0, 1).map((item, index) => {
          const Icon = item.icon;
          return (
            <NavbarMenuItem key={`${item.name}-${index}`} className="w-full flex justify-center">
              <Link
                className="text-white hover:text-gray-200 flex items-center gap-3 py-2"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}

        {/* MODULES accordion */}
        <NavbarMenuItem className="w-full">
          <button
            onClick={() => setIsMobileModulesOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-3 py-2 text-white hover:text-gray-200 text-lg font-normal focus:outline-none"
          >
            <CubeIcon className="w-5 h-5" />
            MODULES
            <motion.span
              animate={{ rotate: isMobileModulesOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence>
            {isMobileModulesOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col items-center w-full ml-2"
              >
                <div className="flex flex-col items-center w-fit gap-1 py-2 border-red-primary/40 border-l-2">
                  {modules.map((mod) => {
                    const Icon = mod.icon;
                    const isActive = pathname === `/modules/${mod.id}`;
                    return (
                      <Link
                        key={mod.id}
                        href={`/modules/${mod.id}`}
                        className={`flex items-center gap-2 py-1 px-4 text-white hover:text-gray-200 text-base font-normal tracking-widest transition-colors w-full 
                          ${isActive ? "text-white border-red-primary border-l-3" : "text-white hover:text-white"}`}
                        onPress={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {mod.label.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenuItem>

        {/* EVENT_DETAILS accordion */}
        <NavbarMenuItem className="w-full">
          <button
            onClick={() => setIsMobileEventDetailsOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-3 py-2 text-white hover:text-gray-200 text-lg font-normal focus:outline-none"
          >
            <CalendarIcon className="w-5 h-5" />
            EVENT_DETAILS
            <motion.span
              animate={{ rotate: isMobileEventDetailsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence>
            {isMobileEventDetailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col items-center w-full ml-2"
              >
                <div className="flex flex-col items-center w-fit gap-1 py-2 border-red-primary/40 border-l-2">
                  {eventDetailsItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === `/${item.id}`;
                    return (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className={`flex items-center gap-2 py-1 px-4 text-white hover:text-gray-200 text-base font-normal tracking-widest transition-colors w-full
                          ${isActive ? "text-white border-red-primary border-l-3" : "text-white hover:text-white"}`}
                        onPress={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenuItem>

        {/* OUR_TEAM accordion */}
        <NavbarMenuItem className="w-full">
          <button
            onClick={() => setIsMobileOurTeamOpen((v) => !v)}
            className="w-full flex items-center justify-center gap-3 py-2 text-white hover:text-gray-200 text-lg font-normal focus:outline-none"
          >
            <UserGroupIcon className="w-5 h-5" />
            OUR_TEAM
            <motion.span
              animate={{ rotate: isMobileOurTeamOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDownIcon className="w-4 h-4" />
            </motion.span>
          </button>

          <AnimatePresence>
            {isMobileOurTeamOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden flex flex-col items-center w-full ml-2"
              >
                <div className="flex flex-col items-center w-fit gap-1 py-2 border-red-primary/40 border-l-2">
                  {ourTeamItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === `/${item.id}`;
                    return (
                      <Link
                        key={item.id}
                        href={`/${item.id}`}
                        className={`flex items-center gap-2 py-1 px-4 text-white hover:text-gray-200 text-base font-normal tracking-widest transition-colors w-full
                          ${isActive ? "text-white border-red-primary border-l-3" : "text-white hover:text-white"}`}
                        onPress={() => setIsMenuOpen(false)}
                      >
                        <Icon className="w-4 h-4" />
                        {item.label.toUpperCase()}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarMenuItem>

        {/* Rest of items (CONTACT_US) */}
        {menuItems.slice(1).map((item, index) => {
          const Icon = item.icon;
          return (
            <NavbarMenuItem key={`${item.name}-${index}`} className="w-full flex justify-center">
              <Link
                className="text-white hover:text-gray-200 flex items-center gap-3 py-2"
                href={item.href}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            </NavbarMenuItem>
          );
        })}

        <NavbarMenuItem className="w-full flex justify-center mt-4">
          <Button
            as={Link}
            href="/register"
            className="bg-red-primary hover:bg-red-700 text-lg text-white font-bold px-8"
            radius="none"
            onPress={() => setIsMenuOpen(false)}
          >
            REGISTER_NOW
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}