'use server'
import { cookies } from "next/headers";

export const getServerLanguage = () => {
  const cookieStore = cookies();
  return cookieStore.get("language")?.value || "en"; };
