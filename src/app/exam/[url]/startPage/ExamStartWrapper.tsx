import ExamStartPage from "./ExamStartPage ";

import Cookies from "universal-cookie";
export default function ExamStartWrapper({
  params,
}: {
  params: { url: string };
}) {
  const cookies = new Cookies();
  return <ExamStartPage url={params.url} />;
}
