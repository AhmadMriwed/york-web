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
import { useContext, useEffect } from "react";
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
import { NewItemFormValidation } from "@/lib/validation";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEnum } from "@/store/adminstore/slices/enums/singleEnumSlice";
import { GlobalState } from "@/types/storeTypes";
import { updateVenue } from "@/store/adminstore/slices/enums/venuesSlice";

interface ModalType {
  open: boolean;
  setOpen: (open: boolean) => void;
  requestType: string;
  id: number;
  isLoading: boolean;
  url: string;
}

export function EditItem({
  open,
  setOpen,
  requestType,
  url,
  id,
  isLoading,
}: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();

  const { singleEnum } = useSelector((state: GlobalState) => state.singleEnum);

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

  useEffect(() => {
    if (open && id) {
      dispatch(getSingleEnum(url + id));
    }
  }, [dispatch, url, id, open]);

  useEffect(() => {
    if (singleEnum) {
      form.reset({
        //@ts-ignore
        title_en: singleEnum.title?.en || "",
        //@ts-ignore
        description_en: singleEnum.description?.en || "",
        //@ts-ignore
        title_ar: singleEnum.title?.ar || "",
        //@ts-ignore
        description_ar: singleEnum.description?.ar || "",
        image: null, // Keep as null for edit unless user wants to change
      });
    }
  }, [singleEnum, form]);

  const handleEdit = (values: z.infer<typeof NewItemFormValidation>) => {
    const formData = new FormData();

    // Append data in the same format as create
    formData.append("title[en]", values.title_en);
    if (values.description_en)
      formData.append("description[en]", values.description_en);
    if (values.title_ar) formData.append("title[ar]", values.title_ar);
    if (values.description_ar)
      formData.append("description[ar]", values.description_ar);
    if (values.image) formData.append("image", values.image);
    console.log(id);

    dispatch(updateVenue({ id, formData }));
  };

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
            onSubmit={form.handleSubmit(handleEdit)}
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

            <DialogFooter className="mt-4">
              <Button
                type="submit"
                className={`bg-primary-color1 ${
                  mode === "dark" ? "hover:bg-primary-color1-dark" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? <Loader className="animate-spin" /> : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
