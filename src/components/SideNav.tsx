"use client";

import { FileIcon, StarIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SideNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-40 flex flex-col gap-4">
      <Link href="/launch/files">
        <Button
          variant={"link"}
          className={clsx("flex gap-2 text-black", {
            "text-primary": pathname.includes("/launch/files"),
          })}
        >
          <FileIcon /> All Files
        </Button>
      </Link>
      <Link href="/launch/favorites">
        <Button
          variant={"link"}
          className={clsx("flex gap-2 text-black", {
            "text-primary": pathname.includes("/launch/favorites"),
          })}
        >
          <StarIcon /> Favorites Files
        </Button>
      </Link>
    </div>
  );
};

export default SideNav;
