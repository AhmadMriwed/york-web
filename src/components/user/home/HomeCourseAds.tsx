"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { FaFilter } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Venue,
  Category,
  Language,
  SeasonModel,
  Year,
  SearchFilters,
  Course,
} from "@/types/rootTypes/rootTypes";
import { fetchAllCourses, FilterCourses } from "@/lib/action/root_action";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";
import { Search } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
const HomeCourseAds = () => {
  const router = useRouter();
  const t = useTranslations("Home");
  const locale = useLocale();

  const [venues, setVenues] = useState<Venue[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [seasons, setSeasons] = useState<SeasonModel[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  // Explicitly type the arrays in the state
  const [formData, setFormData] = useState<SearchFilters>({
    languages: [],
    title: "",
    category_ids: [],
    venue_ids: [],
    season_models: [],
    year_models: [],
  });

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const filterData = await FilterCourses();

        setVenues(filterData.venues || []);
        setCategories(filterData.categories || []);
        setLanguages(filterData.languages || []);
        setSeasons(filterData.season_models || []);
        setYears(filterData.year_models || []);
        const courses = await fetchAllCourses();
        setCourses(courses);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      }
    };

    fetchFilterData();
  }, []);

  const handleCheckboxChange = (
    field: keyof SearchFilters,
    value: any,
    checked: boolean
  ) => {
    setFormData((prevData) => {
      if (Array.isArray(prevData[field])) {
        const updatedValues = checked
          ? [...(prevData[field] as any[]), value]
          : (prevData[field] as any[]).filter((item) => item !== value);

        return { ...prevData, [field]: updatedValues };
      }

      return prevData;
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const filters: any = {};
    if (formData.category_ids && formData.category_ids.length > 0) {
      filters.category_ids = formData.category_ids.map((id) => Number(id));
    }
    if (formData.venue_ids && formData.venue_ids.length > 0) {
      filters.venue_ids = formData.venue_ids.map((id) => Number(id));
    }
    if (formData.languages && formData.languages.length > 0) {
      filters.language = formData.languages;
    }
    if (formData.title && formData.title.trim()) {
      filters.code = formData.title.trim();
    }
    if (formData.year_models && formData.year_models.length > 0) {
      filters.year_models = formData.year_models;
    }
    if (formData.season_models && formData.season_models.length > 0) {
      filters.season_models = formData.season_models;
    }

    const searchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        (value as (string | number)[]).forEach((v) => {
          searchParams.append(`${key}[]`, v.toString());
        });
      } else {
        searchParams.append(key, (value as string).toString());
      }
    });

    if (searchParams.size > 0) {
      router.push(`/${locale}/courses/SearchResult?${searchParams.toString()}`);
    }
  };
  type Dropdown = {
    id: number;
    title: string;
    fieldName: keyof SearchFilters;
    items: { key: any; title: string; value: string | number }[];
  };

  const dropdowns: Dropdown[] = [
    {
      id: 3,
      title: locale === "en" ? "Venues" : "المدن",
      fieldName: "venue_ids",
      items: venues?.map((venue) => ({
        key: venue.id,
        title: venue.title,
        value: venue.id,
      })),
    },
    {
      id: 4,
      title: locale === "en" ? "Season" : "الفصول",

      fieldName: "season_models",
      items: seasons?.map((season) => ({
        key: season.origin,
        title: season.name,
        value: season.origin,
      })),
    },
    {
      id: 5,
      title: locale === "en" ? "Year" : "السنة",
      fieldName: "year_models",
      items: years?.map((year) => ({
        key: year.origin,
        title: year.name,
        value: year.origin,
      })),
    },
    {
      id: 1,
      title: locale === "en" ? "Language" : "اللغة",
      fieldName: "languages",
      items: languages?.map((language) => ({
        key: language.code,
        title: language.name,
        value: language.code,
      })),
    },
    {
      id: 2,
      title: locale === "en" ? "Category" : "الفئة",
      fieldName: "category_ids",
      items: categories?.map((category) => ({
        key: category.id,
        title: category.title,
        value: category.id,
      })),
    },
  ];
  return (
    <div className="bg-gradient-to-b from-[#01475F] to-[#02B5A0] min-w-fit w-[75%] mx-[10%] translate-y-[-30px] lg:translate-y-[-65%] pt-[10px] pb-[20px] md:pb-[50px] px-[20px] lg:px-[35px] rounded-[10px] -mt-36 md:-mt-0">
      <div className="text-center text-white">
        <h2 className="text-[28px] font-semibold leading-[1.2] mb-[20px]">
          {t("upComingCoursesAds.title")}
        </h2>
        <p className="mb-4">{t("upComingCoursesAds.paragraph")}</p>
      </div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center flex-col flex-wrap  justify-between gap-[20px]  w-full">
          <div className="flex gap-2 w-full  md:w-3/4">
            <div className="  flex items-center rounded-lg w-full   bg-white relative">
              <Input
                placeholder={t("upComingCoursesAds.placeholder")}
                className="bg-white placeholder:text-[12px] md:placeholder:text-sm placeholder:max-w-[52px] md:placeholder:max-w-full truncate outline-none ml-4"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <Search className="text-primary-color2 absolute left-1 size-5 md:size-6" />
            </div>
            <Button
              variant="outline"
              className="!bg-[var(--primary-color1)] !text-white"
              type="submit"
              disabled={isLoading}
            >
              <FaFilter className="size-2" />{" "}
              {t("upComingCoursesAds.buttonSearch")}
            </Button>
          </div>

          <div className="grow md:grow-0  flex items-center gap-3 md:gap-6 flex-wrap sm:flex-nowrap">
            {dropdowns.map((dropdown) => (
              <DropdownMenu key={dropdown.id}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="!bg-[var(--primary-color1)] !text-white"
                  >
                    {dropdown.title}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[200px] max-h-[250px] overflow-y-auto"
                >
                  {!dropdowns ? (
                    <div className="text-center">
                      <Spinner className="text-blue-600" />
                      <p className="animate-pulse mt-3">loading...</p>
                    </div>
                  ) : (
                    dropdown.items.map((item) => (
                      <DropdownMenuItem
                        key={item.key}
                        className="cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                      >
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={
                              Array.isArray(formData[dropdown.fieldName])
                                ? //@ts-ignore
                                  formData[dropdown.fieldName].includes(
                                    //@ts-ignore
                                    item.value
                                  )
                                : false
                            }
                            onChange={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange(
                                dropdown.fieldName,
                                item.value,
                                e.target.checked
                              );
                            }}
                            className="mr-2"
                          />
                          {item.title}
                        </label>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HomeCourseAds;
