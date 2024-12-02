"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  answer: z.string().min(2, {
    message: "Answer must be at least 2 characters.",
  }),
});

export function SearchForm({ placeholder }: { placeholder: string }) {
  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-[90%] md:w-[80%] mx-auto relative -top-8 justify-between  bg-gray-300 p-2 rounded-lg"
      >
        <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder={placeholder}
                  {...field}
                  className=" placeholder:text-gray-700 focus:outline-none "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-white p-3">
          <Image
            src={"/icons/search.svg"}
            height={16}
            width={16}
            alt="search"
          />
        </Button>
      </form>
    </Form>
  );
}
