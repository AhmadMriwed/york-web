"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { url, type } = useParams();

  useEffect(() => {
    router.push(`/evaluations/trainee/${url}/startPage`);
  }, []);

  return null;
};

export default Page;
