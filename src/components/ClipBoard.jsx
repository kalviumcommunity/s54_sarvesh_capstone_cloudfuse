import React from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function ClipboardCopyInput({ url }) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(url);

  return (
    <div className="flex items-center">
      <div className="w-72">
        <Input
          value={inputValue}
          type="text"
          disabled={true}
          className="border-primary"
          placeholder="Enter to copy"
          onChange={(e) => {}}
        />
      </div>
      <Button
        // size="lg"
        onMouseLeave={() => setCopied(false)}
        onClick={() => {
          copy(inputValue);
          setCopied(true);
        }}
        className="flex items-center gap-2 bg-primary text-white"
      >
        {copied ? (
          <>
            <CheckIcon className="h-4 w-5" />
            Copied
          </>
        ) : (
          <>
            <DocumentDuplicateIcon className="h-5 w-5" />
            Copy
          </>
        )}
      </Button>
    </div>
  );
}
