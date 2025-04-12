
import Cookie from "universal-cookie";

 const cookie = new Cookie();
 

export const getAuthHeaders = (contentType = "multipart/form-data") => ({
    headers: {
      Authorization: `Bearer ${cookie.get("admin_token")}`,
      "Content-Type": contentType,
      "accept-language":'en',
    },
  });