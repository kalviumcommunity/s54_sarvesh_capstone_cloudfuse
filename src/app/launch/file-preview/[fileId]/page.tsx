"use client";

import { useQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftSquare, FileIcon, Table } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ClipboardCopyInput } from "@/components/ClipBoard";
import { UserCell } from "@/components/Columns";
import { formatRelative } from "date-fns";

const FilePreview = ({ params }: { params: { fileId: string } }) => {
  const getUrl = useQuery(api.files.getFileUrlWithId, {
    fileId: params?.fileId,
  });

  const file = useQuery(api.files.getFileWithId, { fileId: params?.fileId });

  if (!file) return null;

  if (!getUrl) return null;

  return (
    <div className="flex gap-16 flex-col">
      <div className="w-20">
        <Link href={"/launch/files"} className="flex items-center gap-2 w-32">
          <ArrowLeftSquare size={35} className="" />{" "}
          <p className="font-bold">Go Back</p>
        </Link>
      </div>
      <div className="p-14 flex flex-col md:flex-row items-center justify-center border-2 border-primary border-dashed rounded-lg bg-gray-50 hover:bg-gray-100">
        <div className="flex justify-between items-start gap-32 flex-col md:flex-row">
          <div className="flex justify-center items-center flex-col gap-2">
            {file?.type === "image" && (
              <Image
                src={getUrl}
                height={470}
                width={470}
                alt="image"
                className="rounded-md border-4 border-black object-contain"
              />
            )}

            {file?.type === "pdf" && (
              <Image
                src={"/pdf.svg"}
                height={230}
                width={230}
                alt="image"
                className="rounded-md object-contain"
              />
            )}
            {file?.type === "csv" && (
              <Image
                src={"/csv.svg"}
                height={300}
                width={300}
                alt="image"
                className="rounded-md object-contain"
              />
            )}
            <div>
              <p className="text-gray-500 text-sm">
                Uploaded On{" "}
                {formatRelative(new Date(file._creationTime), new Date())}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="font-bold text-2xl">{file?.name}</h1>
            <div className="flex gap-2 flex-col">
              <h2>Upload By</h2>
              <UserCell userId={file?.userId} />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-semibold">
                Sharable Link
              </p>
              <ClipboardCopyInput url={getUrl} />
            </div>
            <Button
              className="w-full text-xl p-6 px-11"
              onClick={() => {
                window.open(getUrl);
              }}
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
