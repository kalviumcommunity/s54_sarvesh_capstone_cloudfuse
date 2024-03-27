"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import UploadButton from "@/components/Upload-Button";
import { FileCard } from "@/components/File-Card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const Page = () => {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");

  return (
    <main className="container mx-auto pt-12">
      {files == undefined && (
        <div className="flex flex-col justify-center items-center mt-48 gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-primary font-semibold">Loading your files ...</p>
        </div>
      )}

      {files && files?.length == 0 && (
        <div className="flex justify-center text-center mt-10 flex-col gap-8 w-full items-center md:mt-20">
          <Image
            src={"/empty.svg"}
            alt="no files found"
            width={300}
            height={300}
          />
          <h1 className="text-2xl">No Files Found , Upload one now!</h1>
          <UploadButton />
        </div>
      )}

      {files && files?.length > 0 && (
        <>
          <div className="flex justify-between items-center gap-5 w-full md:px-14 mb-20">
            <h1 className="text-2xl md:text-4xl font-bold">Your Files</h1>
            <UploadButton />
          </div>
          <div className="grid grid-cols-4 gap-10 md:px-14">
            {files?.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
