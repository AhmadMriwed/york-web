"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { url } = useParams();

  useEffect(() => {
    router.push(`/exam/${url}/startPage`);
  }, []);

  return null;
};

export default Page;
