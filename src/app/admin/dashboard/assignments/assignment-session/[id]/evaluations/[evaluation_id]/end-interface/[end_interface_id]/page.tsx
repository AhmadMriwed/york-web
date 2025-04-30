
'use client';
import { InterfaceModalEvaluation } from "@/components/assignments/assignmentSessionA/assignmentSessionAdd/InterfaceModalEvauation";
import { InterfaceModal } from "@/components/assignments/assignmentSessionA/InterfaceModal";
import { getEndInterface, getStartInterface } from "@/lib/action/exam_action";
import { EndInterfaceType, StartInterfaceType } from "@/types/adminTypes/assignments/interfaceTypes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EndInterface = () => {
  const { end_interface_id, evaluation_id, id } = useParams();
  const [isThereErrorWhileFetchData, setIsThereErrorWhileFetchData] = useState(false);
   const [error, setError] = useState<string | null>(null);
     const [loading, setLoading] = useState(false);
  const [EndInterfaceData, setEndInterfaceData] = useState<EndInterfaceType | null >(null);
 

 useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!end_interface_id) {
          throw new Error("Missing session ID in URL");
        }
    
        const data = await getEndInterface(Number(end_interface_id));
        setIsThereErrorWhileFetchData(false);

        if (!data) {
          throw new Error("no data")
          setIsThereErrorWhileFetchData(true);
        }
        setEndInterfaceData(data?.data);

        console.log(setEndInterfaceData);
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
    <InterfaceModalEvaluation interfaceData={EndInterfaceData} header={"End Interface"} interface_id={Number(end_interface_id)}  id={Number(id)} assignment_id={Number(evaluation_id)} loader={loading} interf={'end'}/>
  )
}
export default EndInterface;












