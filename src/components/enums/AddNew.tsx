"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContext } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { Loader } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVenue } from "@/store/adminstore/slices/enums/venuesSlice";
import { NewItemFormValidation } from "@/lib/validation";

interface ModalType {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestType: string;
  onSubmit: any;
  isLoading: boolean;
  loadingContent?: string;
}

export function AddNewItem({
  open,
  setOpen,
  requestType,
  onSubmit,
  isLoading,
  loadingContent,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const form = useForm<z.infer<typeof NewItemFormValidation>>({
    resolver: zodResolver(NewItemFormValidation),
    defaultValues: {
      title_en: "",
      description_en: "",
      title_ar: "",
      description_ar: "",
      image: null,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:min-w-[450px]">
        <DialogHeader>
          <DialogTitle>{requestType}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 w-full p-2"
          >
            <Tabs defaultValue="English" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="English">English</TabsTrigger>
                <TabsTrigger value="Arabic">Arabic</TabsTrigger>
              </TabsList>

              <TabsContent value="English" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (English)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title in English"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (English)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description in English"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="Arabic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title (Arabic)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title in Arabic" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Arabic)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description in Arabic"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                className="bg-primary-color1"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  loadingContent || "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
