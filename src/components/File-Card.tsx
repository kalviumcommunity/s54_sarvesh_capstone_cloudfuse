import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  GanttChartIcon,
  ImageIcon,
  MoreVertical,
  TextIcon,
  TrashIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { useToast } from "./ui/use-toast";
import { getFiles } from "../../convex/files";
import Image from "next/image";

function FileCardMenu({ file }: { file: Doc<"files"> }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  //! Delete Mutation
  const deleteFile = useMutation(api.files.deleteFile);

  const { toast } = useToast();

  return (
    <>
      {/* Alert Dialog   */}
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              file.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-500"
              onClick={async () => {
                //!   it will delete
                deleteFile({ fileId: file._id });
                toast({
                  variant: "destructive",
                  title: "File Deleted",
                  description: "Your file is Permanently Deleted",
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Drop Down */}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="flex gap-1 text-red-600 items-center justify-center"
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const FileCard = ({ file }: { file: Doc<"files"> }) => {
  const typeIcons = {
    image: <ImageIcon />,
    pdf: <TextIcon />,
    csv: <GanttChartIcon />,
  } as Record<Doc<"files">["type"], ReactNode>;
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex">
          <div className="flex gap-2 justify-center items-center">
            {typeIcons[file.type]}
            {file.name}
          </div>{" "}
        </CardTitle>
        <div className="absolute top-2 right-2">
          <FileCardMenu file={file} />
        </div>
      </CardHeader>
      <CardContent>
        {file.type == "image" && (
          <Image alt={file.name} width="200" height="100" src={file.url} />
        )}
      </CardContent>
      <CardFooter>
        <Button>Download</Button>
      </CardFooter>
    </Card>
  );
};
