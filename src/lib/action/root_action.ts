  import { Venue } from "@/types/adminTypes/courses/coursesTypes";
import { AboutUs, Category, Certificate, Client, ContactUs, Course, FilterCoursesResponse, PlanRegisterData, Question, RegistrationData, SearchFilters, Section, Slider, Training_Plan, Upcoming_Course } from "@/types/rootTypes/rootTypes";
import axios from "axios";
import { get, post } from "./axios";





export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    return await get<Question[]>("/frequently_questions");
  } catch (error: any) {
    console.error("Error fetching questions:", error.message);
    throw new Error("Failed to fetch questions");
  }
};
////////////////////////////////////

export const fetchVenues = async (): Promise<
  Venue[]
> => {
  try {
    return await get<Venue[]>('/venue');
  } catch (error: any) {
    console.error("Error fetching veunes:", error.message);
    throw new Error("Failed to fetch venues");
  }
};


export const getVenuesById = async (id:number): Promise<
  Venue
> => {
  try {
    return await get<Venue>(`/venue/${id}`)
  } catch (error: any) {
    console.error("Error fetching veune:", error.message);
    throw new Error("Failed to fetch venue");
  }
};
///////////////////////////////////

export const fetchCategories = async (): Promise<
  Category[]
> => {
  try {
    return await get<Category[]>('/category');
  } catch (error: any) {
    console.error("Error fetching category:", error.message);
    throw new Error("Failed to fetch cateogry");
  }
};



export const getCategoryById = async (id:number): Promise<
Category
> => {
  try {
    return await get<Category>(`/category/${id}`);
  } catch (error: any) {
    console.error("Error fetching category:", error.message);
    throw new Error("Failed to fetch category");
  }
};
//////////////////////

export const getSectionById = async (id:number): Promise<
  Section
> => {
  try {
    return await get<Section>(`/sections/${id}`);
  } catch (error: any) {
    console.error("Error fetching sections:", error.message);
    throw new Error("Failed to fetch sections");
  }
};
///////////////////
export const fetchAboutUs = async (): Promise<
  AboutUs[]
> => {
  try {
    return await get<AboutUs[]>('/aboutUs');

  } catch (error: any) {
    console.error("Error fetching aboutus:", error.message);
    throw new Error("Failed to fetch aboutus");
  }
};
////////

export const fetchSliders = async (): Promise<
  Slider[]
> => {
  try {
    return await get<Slider[]>('/sliders');
  } catch (error: any) {
    console.error("Error fetching sliders:", error.message);
    throw new Error("Failed to fetch sliders");
  }
};

////////////// courses /////////////

export const fetchAllCourses = async (): Promise<
  Course[]
> => {  
  try {
    return await get<Course[]>('/course_ads');

  } catch (error: any) {
    console.error("Error fetching  courses:", error.message);
    throw new Error("Failed to fetch  courses");
  }
};


export const fetchUpcomingCourses = async (): Promise<
  Upcoming_Course[]
> => {  
  try {
    return await get<Upcoming_Course[]>('/upcoming-courses');
  } catch (error: any) {
    console.error("Error fetching upcoming courses:", error.message);
    throw new Error("Failed to fetch upcoming courses");
  }
};


export const getCoursesByVenueId = async (venueId: number): Promise<Course[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/search`, 
      {
        params: { venue_ids: [venueId] },
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching courses by venue ID:", error.message);
    console.error("Error Details:", error.response?.data || error);
    throw new Error("Failed to fetch courses for the specified venue.");
  }
};

export const getCoursesById = async (id: number): Promise<Course> => {
  try {
    return await get<Course>(`/course_ads/${id}`);
  } catch (error: any) {
    throw new Error("Failed to fetch courses .");
  }
};



export const getCoursesByCategoryId = async (categoryId: number): Promise<Course[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/search`, 
      {
        params: { category_ids: [categoryId] },
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    console.log("API Response Data:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching courses by category ID:", error.message);
    console.error("Error Details:", error.response?.data || error);
    throw new Error("Failed to fetch courses for the specified venue.");
  }
};


export const getCourseById = async (id: number): Promise<Course> => {
  try {
    return await get<Course>(`/course_ads/${id}`);
  } catch (error: any) {
    console.error("Error fetching course:", error.message);
    throw new Error("Failed to fetch course");
  }
};

/////////////// registeration ///////////

export const registration = async (data: RegistrationData): Promise<void> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "cv_trainer" && value instanceof File) {
        formData.append(key, value);
      } else if (typeof value !== "object" || value === null) {
        formData.append(key, String(value));
      }
    });

    if (data.selection_training && typeof data.selection_training === "object") {
      formData.append("selection_training", JSON.stringify(data.selection_training));
    }



    await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/registration`, formData); 
    

  } catch (error: any) {
    console.error("Error during registration:", error.message);
    console.error("Error Details:", error.response?.data || error);

    throw new Error(error.response?.data?.message || "Failed to complete registration.");
  }
};


///////// training plan /////

export const getLatestTrainingPlan = async (): Promise<
  Training_Plan
> => {
  try {
    return await get<Training_Plan>('/training_plan/latestPlan');
  } catch (error: any) {
    console.error("Error fetching training plan:", error.message);
    throw new Error("Failed to fetch training plan");
  }
};

//////// fetch clients ///////

export const fetchClients = async (): Promise<Client[]> => {
  try {
    return await get<Client[]>('/clients');  
  } catch (error: any) {
    throw new Error("Failed to fetch clients");
  }
};

export const storePlanRegister = async (data: PlanRegisterData): Promise<void> => {
    try {
      await axios.post('/api/plan_register', data); 
    } catch (error: any) {
      let errorMessage = 'Failed to register the plan.';

      if (error.response) {
        errorMessage = error.response.data?.message || 'Server returned an error.';
        console.error('Error response:', error.response.data);
      } else if (error.request) {
        errorMessage = 'No response received from the server.';
        console.error('No response received:', error.request);
      } else {
        errorMessage = 'An error occurred while setting up the request.';
        console.error('Request setup error:', error.message);
      }

      console.error('Error during plan registration:', errorMessage);
      throw new Error(errorMessage);
    }
  };



//// search courses /////

export const SearchCourse = async (filters: SearchFilters): Promise<Course[]> => {
  try {
    const query = new URLSearchParams();

    const languageMap: Record<string, string> = {
      en: "English",
      ar: "Arabic",
    };

    console.log(filters);
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        if (key === "languages") {
          value.forEach((v) => {
            const fullLanguage = languageMap[v] || v;
            query.append("languages[]", fullLanguage.toString());
          });
        } else {
          value.forEach((v) => query.append(`${key}[]`, v.toString()));
        }
      } else if (value !== undefined && value !== null && value !== "") {
        query.append(key, value.toString());
      }
    });

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/search?${query.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data?.data) {
      return response.data.data as Course[];
    } else {
      console.warn("Unexpected response structure:", response.data);
      return [];
    }
  } catch (error: any) {
    console.error("Error searching courses:", error.message);
    throw new Error("Failed to search courses. Please try again later.");
  }
};

export const FilterCourses = async (): Promise<FilterCoursesResponse> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/getMap/filterCourse`);
    const { languages, venues, categories, season_models,year_models} = response.data.data;


    return {
      languages,
      venues,
      categories,
      season_models,
      year_models
    };
  } catch (error: any) {
    console.error("Error fetching course data:", error.message);
    throw new Error("Failed to fetch course data");
  }
};

////// contact us //////

export const fetchContactUsData = async (): Promise<ContactUs[]> => {
  try {
    return await get<ContactUs[]>('/contact_us');  
  } catch (error: any) {
    console.error("Error fetching contact us:", error.message);
    throw new Error("Failed to fetch contact us");
  }
};

export const fetchContactUsDataWithId = async (id:number): Promise<ContactUs> => {
  try {
    return await get<ContactUs>(`/contact_us/${id}`);  
  } catch (error: any) {
    console.error("Error fetching contact us:", error.message);
    throw new Error("Failed to fetch contact us");
  }
};

export const fetchContactUsIcons = async (): Promise<ContactUs[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/contact_us_icons`);
    return await get<ContactUs[]>('/contact_us_icons');  
  } catch (error: any) {
    console.error("Error fetching contact us icons:", error.message);
    throw new Error("Failed to fetch contact us icons");
  }
};

///// search certificate //////// 
export const SearchCertificate = async (
  certificate_id: string | null
): Promise<Certificate> => {

  if (!certificate_id) {
    throw new Error("Certificate ID is required.");
  }

  try {
   
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/certificates/search?code=${certificate_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data)

    if (response.data?.data) {
      return response.data.data as Certificate;
    } else {
      throw new Error("No certificate data found.");
    }
  } catch (error: any) {
    console.error("Error searching certificate:", error);
    throw new Error("Failed to search certificate. Please try again later.");
  }
};


