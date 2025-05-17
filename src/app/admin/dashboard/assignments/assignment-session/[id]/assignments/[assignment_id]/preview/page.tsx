"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const { url, id, assignment_id } = useParams();

  useEffect(() => {
    router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/preview/startPage`);
  }, []);

  return null;
};

export default Page;
