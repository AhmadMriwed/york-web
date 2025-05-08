"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { url, test } = useParams();

  useEffect(() => {
    router.push(`/exam/${url}/startPage`);
  }, []);

  return null;
};

export default Page;
