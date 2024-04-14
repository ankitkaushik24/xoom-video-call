"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    iconUrl: "/icons/Home.svg",
    label: "Home",
    route: "/",
  },
  {
    iconUrl: "/icons/upcoming.svg",
    label: "Upcoming",
    route: "/upcoming",
  },
  {
    iconUrl: "/icons/previous.svg",
    label: "Previous",
    route: "/previous",
  },
  {
    iconUrl: "/icons/recordings.svg",
    label: "Recordings",
    route: "/recordings",
  },
  {
    iconUrl: "/icons/add-personal.svg",
    label: "Personal Room",
    route: "/personal",
  },
];

const SideBar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex w-fit flex-col justify-between bg-dark-1 p-6 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-6">
        {links.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={item.iconUrl}
                alt={item.label}
                width={24}
                height={24}
                className="shrink-0"
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {item.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
