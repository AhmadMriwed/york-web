import { Venue } from "@/types/adminTypes/courses/coursesTypes";
import { AboutUs, Category, Certificate, Client, ContactUs, Course, FilterCoursesResponse, FooterDetails, FooterIcons, PlanRegisterData, Question, RegistrationData, SearchFilters, Section, Slider, Training_Plan, Upcoming_Course } from "@/types/rootTypes/rootTypes";
import axios from "axios";
import { get, post } from "./axios";
import Cookies from "js-cookie"; 
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    return await get<Question[]>("/frequently_questions");
  } catch (error: any) {
    console.error("Error fetching questions:", error.message);
    throw new Error("Failed to fetch questions");
  }
};
////////////////////////////////////

export const fetchVenues = async (language:string): Promise<Venue[]> => {
  try {

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/venue`,
      {
        headers: {
          'Accept-Language': language, 
        },
      }
    );
    return response.data.data; 

  } catch (error: any) {
    console.error("Error fetching veunes:", error.message);


    throw new Error(error.response?.data?.message );
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


export const fetchCategories = async (language:string): Promise<Category[]> => {
  
  try {

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`,
      {
        headers: {
          'Accept-Language':language, 
        },
      }
    );

    return response.data.data; 
  } catch (error: any) {
    console.error("Error fetching categories:", error.message);

    throw new Error(error.response?.data?.message );
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
          'Accept-Language': Cookies.get('language'),  
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


export const getCourseById = async (id: number): Promise<Course> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/${id}`, 
      {
        headers: {
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error("Failed to fetch courses");
  }
};


export const getCoursesByCategoryId = async (categoryId: number): Promise<Course[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/search`, 
      {
        params: { category_ids: [categoryId] },
        headers: {
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching courses by category ID:", error.message);
    console.error("Error Details:", error.response?.data || error);
    throw new Error("Failed to fetch courses for the specified venue.");
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

export const getLatestTrainingPlan = async (): Promise<Training_Plan> => {
  try {

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/training_plan/latestPlan`,
      {
        headers: {
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );

    return response.data; 
  } catch (error: any) {
    console.error("Error fetching training plan:", error.message);

    // رمي خطأ مع رسالة واضحة
    throw new Error(error.response?.data?.message || "Failed to fetch training plan");
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
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );

    if (response.data?.data) {
      console.log(response.data.data);
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/getMap/filterCourse`,
      {
        headers: {
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );
    const { languages, venues, categories, season_models,year_models} = response.data.data;

  console.log(languages);
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

export const contact_us = async (values: {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await axios.post(`/api/contact_us/send-message`, values, {
      headers: {
        'Accept-Language': 'en'
      },
    });
    
    return response.data; 
  } catch (error: any) {
    console.error("Submission failed:", error);

    const errorMessage =
      error.response?.data?.message || "Failed . Please try again.";

    throw new Error(errorMessage); 
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
          'Accept-Language': Cookies.get('language'), 
        },
      }
    );

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



export const CertificateReview = async (values: {
  first_name: string;
  last_name: string;
  email: string;
  certificate_code: string;
  message: string;
}) => {
  
  try {
    const response = await axios.post(`/api/certificates_review`, values, {
      headers: {
        'Accept-Language': Cookies.get("language")
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Submission failed:", error);

    const errorMessage =
      error.response?.data?.message || "Failed to submit certificate review. Please try again.";

    throw new Error(errorMessage);
  }
};

//////footer //// 

export const fetchFooterDetails = async (language:string): Promise<FooterDetails[]> => {
  try {

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/footer-details`,
      {
        headers: {
          'Accept-Language': language, 
        },
      }
    );
    return response.data.data; 

  } catch (error: any) {
    console.error("Error fetching veunes:", error.message);


    throw new Error(error.response?.data?.message );
  }
};
export const fetchFooterIcons = async (language:string): Promise<FooterIcons[]> => {
  try {

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contact_us_icons`,
      {
        headers: {
          'Accept-Language': language, 
        },
      }
    );
    return response.data.data; 

  } catch (error: any) {
    console.error("Error fetching veunes:", error.message);


    throw new Error(error.response?.data?.message );
  }
};

export const Subscribe = async (data:{name:string,email:string}): Promise<void> => {
  try {
    await axios.post('/api/subscribe', data); 
  } catch (error: any) {

    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }

  }
};


// dwonload file /// 
export const downloadFile = async (filePath: string) => {
  try {
    if (!filePath) {
      throw new Error("File path is missing");
    }

    // Call the proxy API configured in next.config.js
    const response = await fetch(`/api/proxy?path=${encodeURIComponent(filePath)}`);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    // Convert the response to Blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath.split("/").pop() || "downloaded_file.pdf"; // Extract the file name
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Clean up the temporary URL
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


// read file / //
export const readFile = async (filePath: string): Promise<string | null> => {
  try {
    if (!filePath) {
      throw new Error("File path is missing");
    }

    const response = await fetch(`/api/proxy/read?path=${encodeURIComponent(filePath)}`);

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Download failed:", error);
    return null;
  }
};