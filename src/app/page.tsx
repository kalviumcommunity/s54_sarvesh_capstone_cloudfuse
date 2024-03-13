"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
