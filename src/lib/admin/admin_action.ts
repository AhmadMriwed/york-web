import axios from "axios";
import { toast } from "sonner";
import Cookie from "universal-cookie";

const cookie = new Cookie();

export const editProfile = async (formData: FormData) => {
  try {
    const response = await axios.put(
      "/api/admin/updateProfile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${cookie.get("admin_token")}`,
          "Content-Type": "application/json",
          "Accept-Language": "en",
        },
      }
    );

    console.log("API Response:", response.data);

    // تعديل شرط التحقق من النجاح ليتوافق مع رد السيرفر
    if (response.data && response.data.message === "Updated successfully") {
      toast.success(response.data.message);
      return response.data.data;
    }

    throw new Error(response.data?.message || "فشل في تحديث الملف الشخصي");
  } catch (error: any) {
    console.error("API Error Details:", error);
    
    let errorMessage = "حدث خطأ غير متوقع";
    
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || 
                   error.response?.data?.error || 
                   error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};