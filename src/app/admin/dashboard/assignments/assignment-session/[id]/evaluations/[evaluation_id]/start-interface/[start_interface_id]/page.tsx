
'use client';
import { InterfaceModalEvaluation } from "@/components/assignments/assignmentSessionA/assignmentSessionAdd/InterfaceModalEvauation";
import { InterfaceModal } from "@/components/assignments/assignmentSessionA/InterfaceModal";
import { getStartInterface } from "@/lib/action/exam_action";
import { StartInterfaceType } from "@/types/adminTypes/assignments/interfaceTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const StartInterface = () => {
  const { start_interface_id, evaluation_id, id } = useParams();
  const [isThereErrorWhileFetchData, setIsThereErrorWhileFetchData] = useState(false);
   const [error, setError] = useState<string | null>(null);
     const [loading, setLoading] = useState(false);
  const [startInterfaceData, setStartInterfaceData] = useState<StartInterfaceType | null >(null);

 useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!start_interface_id) {
          throw new Error("Missing session ID in URL");
        }
    
        const data = await getStartInterface(Number(start_interface_id));
        setIsThereErrorWhileFetchData(false);

        if (!data) {
          throw new Error("no data")
          setIsThereErrorWhileFetchData(true);
        }
        setStartInterfaceData(data?.data);

        console.log(setStartInterfaceData);
      } catch (err) {
        setIsThereErrorWhileFetchData(true);
        setError(err instanceof Error ? err.message : "Failed to fetch session");
      }
      finally {
        setLoading(false);
      }
    }
    fetch();

  }, []);

  
  return (
    <InterfaceModalEvaluation interfaceData={startInterfaceData} header={"Start Interface"} interface_id={Number(start_interface_id)}  id={Number(id)} assignment_id={Number(evaluation_id)} loader={loading} interf={'start'}/>
  )
}
export default StartInterface;












