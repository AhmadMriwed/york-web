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
      image_icon: null,
    },
  });

  console.log(form);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`sm:min-w-[450px] ${mode === "dark" ? "dark" : ""}`}
      >
        <DialogHeader>
          <DialogTitle
            className={`${mode === "dark" ? "text-white" : "text-black"}`}
          >
            {requestType}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 w-full p-2"
          >
            <Tabs defaultValue="English" className="w-full">
              <TabsList
                className={`grid w-full grid-cols-2 ${
                  mode === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <TabsTrigger value="English">English</TabsTrigger>
                <TabsTrigger value="Arabic">Arabic</TabsTrigger>
              </TabsList>

              <TabsContent value="English" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={mode === "dark" ? "text-white" : ""}
                      >
                        Title (English)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title in English"
                          {...field}
                          className={
                            mode === "dark"
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }
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
                      <FormLabel
                        className={mode === "dark" ? "text-white" : ""}
                      >
                        Description (English)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description in English"
                          {...field}
                          className={
                            mode === "dark"
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }
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
                      <FormLabel
                        className={mode === "dark" ? "text-white" : ""}
                      >
                        Title (Arabic)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter title in Arabic"
                          {...field}
                          className={
                            mode === "dark"
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }
                        />
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
                      <FormLabel
                        className={mode === "dark" ? "text-white" : ""}
                      >
                        Description (Arabic)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description in Arabic"
                          {...field}
                          className={
                            mode === "dark"
                              ? "bg-gray-700 border-gray-600 text-white"
                              : ""
                          }
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
                  <FormLabel className={mode === "dark" ? "text-white" : ""}>
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className={
                        mode === "dark"
                          ? "bg-gray-700 border-gray-600 text-white file:text-white"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image_icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={mode === "dark" ? "text-white" : ""}>
                    Image Icon
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className={
                        mode === "dark"
                          ? "bg-gray-700 border-gray-600 text-white file:text-white"
                          : ""
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                className={`bg-primary-color1 ${
                  mode === "dark" ? "hover:bg-primary-color1-dark" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
