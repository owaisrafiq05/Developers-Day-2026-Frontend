"use client";

import { ReactNode } from "react";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import Image from "next/image";

interface ModuleCardProps {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
  code: string;
}

export default function ModuleCard({ id, icon, title, description, code }: ModuleCardProps) {
  return (
    <div className="bg-dark-red-1 flex flex-col h-[350px] overflow-hidden">
      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Header with icon and code */}
        <div className="flex justify-between items-start mb-6">
          <div className="text-red-primary text-3xl flex-shrink-0">{icon}</div>
          <span className="text-gray-600 text-xs font-mono">{code}</span>
        </div>

        {/* Title */}
        <h3 className="text-white text-xl font-bold mb-4 uppercase leading-tight">{title}</h3>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed flex-1">{description}</p>
      </div>

      {/* Read More Button */}
      <div className="px-6 pb-6">
        <Button
          as={Link}
          href={`/modules/${id}`}
          className="bg-dark-red-2 hover:bg-dark-red-2 text-white font-mono text-sm w-full justify-between"
          radius="none"
          fullWidth
          endContent={<Image src="/icons/read.svg" alt="Read" width={20} height={20} />}
        >
          SYS:_READ_MORE
        </Button>
      </div>
    </div>
  );
}
