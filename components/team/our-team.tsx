"use client";

import TeamCard from "./team-card";
import { motion } from "framer-motion";

function roleFromFilename(filename: string): string {
  return filename.replace(/\.(png|jpg|jpeg|webp)$/i, "").replace(/_/g, " ");
}

const teamMembers = [
  {
    name: "NEHA AAMIR",
    role: roleFromFilename("President.png"),
    image: "/team/President.png",
    linkedInUrl: "https://www.linkedin.com/in/nehaaamir17/",
  },
  {
    name: "MUHAMMAD HASNAIN",
    role: roleFromFilename("Vice_President.png"),
    image: "/team/Vice_President.png",
    linkedInUrl: "https://www.linkedin.com/in/muhammad-hasnain-61b4aa379/",
  },
  {
    name: "SHOAIB RAZA",
    role: roleFromFilename("General_Secretary.png"),
    image: "/team/General_Secretary.png",
    linkedInUrl: "https://www.linkedin.com/in/shoaib-raza-9497a72b5/",
  },
  {
    name: "MUHAMMAD HUZAIFA",
    role: roleFromFilename("Director_Finance.png"),
    image: "/team/Director_Finance.png",
    linkedInUrl: "https://www.linkedin.com/in/mhuzaifa777/",
  },
  {
    name: "ASFANDYAR KHANZADA",
    role: roleFromFilename("Director_Technology.png"),
    image: "/team/Director_Technology.png",
    linkedInUrl: "https://www.linkedin.com/in/asfandyar-khanzada/",
  },
  {
    name: "ASHAR USMANI",
    role: roleFromFilename("Director_Computing.png"),
    image: "/team/Director_Computing.png",
    linkedInUrl: "https://www.linkedin.com/in/muhammad-ashar-usmani/",
  },
  {
    name: "ABDULHADI YASEEN",
    role: roleFromFilename("Director_Corporate_Affairs.png"),
    image: "/team/Director_Corporate_Affairs.png",
    linkedInUrl: "https://www.linkedin.com/in/abdulhadi-yaseen/",
  },
  {
    name: "MISBAH IBRAHIM",
    role: roleFromFilename("Director_Guest_Relations.png"),
    image: "/team/Director_Guest_Relations.png",
    linkedInUrl: "https://www.linkedin.com/in/misbahibrahim922/",
  },
  {
    name: "TAQWA RASHEED",
    role: roleFromFilename("Director_Branding.png"),
    image: "/team/Director_Branding.png",
    linkedInUrl: "https://www.linkedin.com/in/taqwa-rasheed-146aba232/",
  },
  {
    name: "AHMED MIRZA",
    role: roleFromFilename("Director_Marketing.png"),
    image: "/team/Director_Marketing.png",
    linkedInUrl: "https://www.linkedin.com/in/ahmed-mirza-b07b432b5/",
  },
  {
    name: "ASHNA JAMAL",
    role: roleFromFilename("Director_Promotions.png"),
    image: "/team/Director_Promotions.png",
    linkedInUrl: "https://www.linkedin.com/in/ashnajamal/",
  },
  {
    name: "SAUD MALIK",
    role: roleFromFilename("Event_Administrator.png"),
    image: "/team/Event_Administrator.png",
  },
  {
    name: "ABDUL HADI",
    role: roleFromFilename("Director_MEDIA.png"),
    image: "/team/Director_MEDIA.png",
  },
].map((member, index) => ({
  ...member,
  gradientVariant: (index % 2 === 0 ? "red" : "cyan") as "red" | "cyan",
  isMiddle: member.image.endsWith("/President.png"),
}));

const topLeaders = teamMembers.filter(member =>
  member.image.endsWith("/President.png") ||
  member.image.endsWith("/Vice_President.png")
);

const otherMembers = teamMembers.filter(member =>
  !member.image.endsWith("/President.png") &&
  !member.image.endsWith("/Vice_President.png")
);

export default function OurTeam() {
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
              OUR_TEAM
            </h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              MEET THE LEADERSHIP BEHIND DEVDAY.
            </p>
          </div>
        </motion.div>

        {/* Team Cards — staggered grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.role}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.08, 0.56),
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              >
                <TeamCard {...member} />
              </motion.div>
            ))}
          </div> */}
        {/* PRESIDENT ROW (always centered single card) */}
        {/* PRESIDENT + VICE PRESIDENT */}
        <div className="flex justify-center gap-6 lg:gap-8 mb-12 flex-wrap">
          {topLeaders.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="w-full md:w-1/2 lg:w-1/3"
            >
              <TeamCard {...member} />
            </motion.div>
          ))}
        </div>

        {/* OTHER MEMBERS GRID */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {otherMembers.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: Math.min(index * 0.08, 0.56),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <TeamCard {...member} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
