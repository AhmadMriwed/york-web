import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { questions } from "@/constants";
const FrequentlyAskedQuestions = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-[85%]  mt-16 mx-auto transition-all duration-300 grid grid-cols-1 md:grid-cols-2  gap-8"
    >
      {questions.map((item, index) => (
        <AccordionItem
          key={item.answer}
          value={`item-${index + 1}`}
          className="col-span-1 text-start"
        >
          <AccordionTrigger>
            <span className="text-lg font-bold">Q:</span>
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <span className="text-base font-bold">A:</span>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FrequentlyAskedQuestions;
