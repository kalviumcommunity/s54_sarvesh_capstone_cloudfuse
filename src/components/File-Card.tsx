import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { formatRelative } from "date-fns";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { GanttChartIcon, ImageIcon, TextIcon } from "lucide-react";

import { ReactNode } from "react";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { FileCardMenu } from "./FileMenu";
import { useRouter } from "next/navigation";

export function FileCard({
  file,
}: {
  file: Doc<"files"> & { isFavorited: boolean; url: string };
}) {
  const userProfile = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <TextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;

  const router = useRouter();

  return (
    <Card className="w-full sm:w-60">
      <CardHeader className="relative">
        <CardTitle className="flex gap-2 text-base font-normal">
          <div className="flex gap-2 justify-center items-center">
            {typeIcons[file.type]}
            {file.name}
          </div>
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardMenu isFavorited={file.isFavorited} file={file} />
        </div>
      </CardHeader>
      <CardContent
        className="h-[200px] flex justify-center items-center cursor-pointer"
        onClick={() => {
          router.push("/launch/file-preview/" + file.fileId);
        }}
      >
        {file.type == "image" && (
          <Image
            alt={file.name}
            width="200"
            height="100"
            src={file.url}
            className="rounded-md max-w-52 max-h-28 object-contain"
          />
        )}

        {file.type == "csv" && (
          <Image
            alt={file.name}
            width="200"
            height="100"
            src={"/csv.svg"}
            className="rounded-md max-w-52 max-h-28 object-contain"
          />
        )}
        {file.type == "pdf" && (
          <Image
            alt={file.name}
            width="200"
            height="100"
            src={"/pdf.svg"}
            className="rounded-md max-w-52 max-h-28 object-contain"
          />
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between text-xs mt-3 items-center">
        <div className="flex gap-1 text-gray-700 items-center w-40">
          <Avatar className="w-6 h-6">
            <AvatarImage src={userProfile?.image} />
            <AvatarFallback>CF</AvatarFallback>
          </Avatar>
          {userProfile?.name}
        </div>
        <div className="text-gray-700 mt-2 sm:mt-0">
          Uploaded {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
}
