import { Venue } from "@/types/adminTypes/courses/coursesTypes";
import { AboutUs, Category, Client, Course, Question, Section, Slider, Training_Plan } from "@/types/rootTypes/rootTypes";
import axios from "axios";

export const fetchQuestions = async (): Promise<
  Question[]
> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/frequently_questions`
    );
    return response.data.data;
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/venue`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching veunes:", error.message);
    throw new Error("Failed to fetch venues");
  }
};


export const getVenuesById = async (id:number): Promise<
  Venue
> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/venue/${id}`
    );
    return response.data.data;
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category`
    );
    console.log(response.data.data)
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching category:", error.message);
    throw new Error("Failed to fetch cateogry");
  }
};



export const getCategoryById = async (id:number): Promise<
Category
> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/${id}`
    );
    return response.data.data;
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sections/${id}`
    );
    return response.data.data;
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/aboutUs`
    );
    return response.data;
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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/sliders`);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching sliders:", error.message);
    throw new Error("Failed to fetch sliders");
  }
};

////////////// courses /////////////
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
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/course_ads/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching course:", error.message);
    throw new Error("Failed to fetch course");
  }
};

/////////////// registeration ///////////

export const registration = async (data: {
  name: string;
  email: string;
  phone: string;
  address?: string;
  notes?: string;
}): Promise<void> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Registration successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error during registration:", error.message);
    console.error("Error Details:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Failed to complete registration."
    );
  }
};

///////// training plan /////

export const getLatestTrainingPlan = async (): Promise<
  Training_Plan
> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/training_plan/latestPlan`
    );
    return response.data.data;
  } catch (error: any) {
    console.error("Error fetching training plan:", error.message);
    throw new Error("Failed to fetch training plan");
  }
};


//////// fetch clients ///////

export const fetchClients = async (): Promise<Client[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/clients`);
    return response.data.data;  
  } catch (error: any) {
    console.error("Error fetching clients:", error.message);
    throw new Error("Failed to fetch clients");
  }
};
