//@ts-nocheck

"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadButton from "@/components/Upload-Button";
import { FileCard } from "@/components/File-Card";
import Image from "next/image";
import { GridIcon, Loader2, TableIcon } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { DataTable } from "./FileTable";
import { columns } from "./Columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Doc } from "../../convex/_generated/dataModel";
import { Label } from "@radix-ui/react-label";

function EmptyState({
  showUploadButton = true,
  onBack,
  isSearching,
}: {
  showUploadButton?: boolean;
  onBack?: () => void;
  isSearching?: boolean;
}) {
  return (
    <div className="flex justify-center text-center mt-10 flex-col gap-8 w-full items-center md:mt-20">
      <Image src={"/empty.svg"} alt="no files found" width={300} height={300} />
      <h1 className="text-2xl">No Files Found</h1>
      {showUploadButton && !isSearching && <UploadButton />}
      {isSearching && onBack && (
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-violet-700"
        >
          Back
        </button>
      )}
    </div>
  );
}

export function FileBrowser({
  title,
  favoritesOnly,
  deleteOnly,
}: {
  title: string;
  favoritesOnly?: boolean;
  deleteOnly?: boolean;
}) {
  const organization = useOrganization();
  const user = useUser();

  // * Search Option
  const [query, setQuery] = useState("");
  const [type, setType] = useState<Doc<"files">["type"] | "all">("all");

  let orgId: string | undefined = undefined;

  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }
  const favorites = useQuery(
    api.files.getAllFavorites,
    orgId ? { orgId } : "skip"
  );

  const files = useQuery(
    api.files.getFiles,
    orgId
      ? {
          orgId,
          type: type == "all" ? undefined : type,
          query,
          favorites: favoritesOnly,
          deleteOnly,
        }
      : "skip"
  );

  const modifiledFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some(
        (favorite) => favorite.fileId === file._id
      ),
    })) ?? [];

  const showEmptyState = !files || files.length === 0;

  const handleBack = () => {
    setQuery("");
  };

  return (
    <div>
      {showEmptyState && (
        <EmptyState
          showUploadButton={!favoritesOnly && !deleteOnly}
          onBack={query ? handleBack : undefined}
          isSearching={!!query}
        />
      )}
      {!showEmptyState && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 w-full md:px-14 mb-20">
            <h1 className="text-2xl md:text-4xl font-bold">{title}</h1>
            <SearchBar query={query} setQuery={setQuery} />
            <UploadButton />
          </div>

          <Tabs defaultValue="grid">
            <div className="flex flex-col md:flex-row justify-between px-4 md:px-14 items-center">
              <TabsList className="w-full md:w-[300px] mb-2 md:mb-0">
                <TabsTrigger value="grid" className="flex gap-2 items-center">
                  <GridIcon />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="table" className="flex gap-2 items-center">
                  <TableIcon />
                  Table
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2 items-center justify-center mt-2 md:mt-0">
                <Label htmlFor="typeSelect">Type Filter</Label>
                <Select
                  value={type}
                  onValueChange={(newType) => {
                    setType(newType as any);
                  }}
                >
                  <SelectTrigger className="w-[180px]" defaultValue={"all"}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {files == undefined && (
              <div className="flex flex-col justify-center items-center mt-48 gap-3">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-primary font-semibold">
                  Loading your files ...
                </p>
              </div>
            )}
            <TabsContent value="grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:px-14 pt-10">
                {modifiledFiles?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="table">
              {" "}
              <DataTable columns={columns} data={modifiledFiles} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
