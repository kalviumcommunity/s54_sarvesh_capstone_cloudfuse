import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileIcon, StarIcon } from "lucide-react";
import SideNav from "@/components/SideNav";

// export const metadata: Metadata = {
//   title: "CloudFuse",
//   description: "Secure and Collaborative File Storage Made Simple",
// };

export default function LaunchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="container mx-auto pt-12">
      <div className="flex gap-8">
        <SideNav />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
