"use client";

import { useState } from "react";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white">
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
                    href="#"
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

            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button className="bg-secondary hover:bg-[#6b75894a] border-2 border-[#7C3AED] text-primary font-bold">
                      Log In
                    </Button>
                  </SignInButton>
                </SignedOut>

                <div className="hidden sm:flex">
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
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    {menuOpen ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </>
                    )}
                  </svg>
                </button>
                {menuOpen && (
                  <nav className="w-screen bg-white z-30 h-screen absolute top-[80%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded p-2 text-gray-600 transition hover:text-gray-600/75">
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

export default NavBar;
