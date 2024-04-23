"use client";

import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftSquare, BackpackIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const FilePreview = ({ params }: { params: { fileId: string } }) => {
  const getUrl = useQuery(api.files.getFilewithId, { fileId: params?.fileId });

  if (!getUrl) return null;

  return (
    <div className="flex gap-24 flex-col">
      <div>
        <Link href={"/launch/files"} className="flex items-center gap-2">
          <ArrowLeftSquare size={35} className="" />{" "}
          <p className="font-bold">Go Back</p>
        </Link>
      </div>
      <div className="p-16 flex flex-col items-center justify-center border-2 border-primary border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
        <div className="flex justify-between items-center gap-44">
          <Image src={getUrl} height={500} width={500} alt="image" />
          <div className="flex">
            <Button className="w-full text-xl p-6 px-11">Download</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
