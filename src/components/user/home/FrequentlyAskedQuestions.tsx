import SafeDescription from "@/components/review/SafeDescription";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "next-intl";
import { cookies } from "next/headers";
const FrequentlyAskedQuestions = ({
  questions = [],
}: {
  questions: { question: string; answer: string }[];
}) => {
  const cookieStore = cookies();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-[85%] mt-16 mx-auto transition-all duration-300 grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {questions?.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="col-span-1 text-start"
        >
          <AccordionTrigger className="text-base  ">
            <span className="text-xl font-bold">
              {item.question.charAt(0)}:
            </span>{" "}
            {item.question.substring(2)}
          </AccordionTrigger>
          <AccordionContent>
            <SafeDescription
              description={item.answer}
              lang={"ar"}
              color="gray-700"
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FrequentlyAskedQuestions;
