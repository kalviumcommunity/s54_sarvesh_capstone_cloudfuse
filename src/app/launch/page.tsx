"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import UploadButton from "@/components/Upload-Button";
import { FileCard } from "@/components/File-Card";

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
      <div className="flex justify-between items-center gap-5 w-full md:px-14 mb-20">
        <h1 className="text-2xl md:text-4xl font-bold">Your Files</h1>
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4 md:px-14">
        {files?.map((file) => {
          return <FileCard key={file._id} file={file} />;
        })}
      </div>
    </main>
  );
};

export default Page;
