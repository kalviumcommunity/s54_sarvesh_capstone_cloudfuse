"use client";

import { useState } from "react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  UserButton,
  OrganizationSwitcher,
  SignedOut,
} from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white border-b">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link href={"/"}>
              <Image src="/logo.png" alt="logo" height={"180"} width={"180"} />
            </Link>
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-10 text-sm font-[600]">
                <li>
                  <Link
                    className="text-[#6B7589] transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#6B7589] transition hover:text-gray-500/75"
                    href="#"
                  >
                    {" "}
                    Features{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#6B7589] transition hover:text-gray-500/75"
                    href="/pricing"
                  >
                    {" "}
                    Pricing{" "}
                  </Link>
                </li>
                <li>
                  <Image src={"/star.png"} alt="star" width={20} height={20} />
                </li>
              </ul>
            </nav>

            <div className="flex items-center md:-ml-9 gap-4">

              <div className="block md:hidden">
                

                {menuOpen && (
                  <nav 
                  className="w-screen flex pt-20 bg-white z-30  h-screen top-[60%] 
                  absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                  rounded p-2 text-gray-600 transition hover:text-gray-600/75">
                    <ul className="flex flex-col w-full items-center gap-6 text-xl font-[600]">
                      <li>
                        <Link
                          className="text-[#6B7589] transition hover:text-gray-500/75"
                          href="#about"
                        >
                          About
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-[#6B7589] transition hover:text-gray-500/75"
                          href="#features"
                        >
                          Features
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-[#6B7589] transition hover:text-gray-500/75"
                          href="/pricing"
                        >
                          Pricing
                        </Link>
                      </li>
                      <li>
                        <Image
                          src={"/star.png"}
                          alt="star"
                          width={20}
                          height={20}
                        />
                      </li>
                      <li>
                        <SignedIn>
                          <SignOutButton>
                            <Button>Log Out</Button>
                          </SignOutButton>
                        </SignedIn>
                        <SignedOut>
                          <SignUpButton mode="modal">
                            <Button>Sign up for free</Button>
                          </SignUpButton>
                        </SignedOut>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;