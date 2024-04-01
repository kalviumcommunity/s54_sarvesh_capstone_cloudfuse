import { zodResolver } from "@hookform/resolvers/zod";
import React, { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const SearchBar = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}) => {
  const formSchema = z.object({
    query: z.string().max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { query: "" },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setQuery(values.query);
  }
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-2 items-center"
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder="your file name" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className="flex gap-1"
            type="submit"
            size={"sm"}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}{" "}
            <SearchIcon /> Search
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SearchBar;
