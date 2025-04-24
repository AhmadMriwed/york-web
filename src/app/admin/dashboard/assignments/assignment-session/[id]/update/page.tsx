


"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // أضفنا استيراد useParams
import { useDispatch } from "react-redux";
import { 
  fetchAssignmentSessions, 
  fetchSectionTypes,
  fetchAssignmentSessionById // نفترض وجود هذه الدالة في API
} from "@/lib/action/assignment_action";
import { Header } from "rsuite";
import dynamic from "next/dynamic";

const UpdateAssignmentSection = dynamic(
  () => import("@/components/assignments/assignmentSessionA/UpdateAssignmentSection"),
  { ssr: false }
);
const UpdateExamSection = () => {
  const { id } = useParams(); 
  const router = useRouter();
  const dispatch = useDispatch<any>();
  const [assignmentSession, setAssignmentSession] = useState<any>(null);
  const [assignmentTypesData, setAssignmentTypesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!id) {
          throw new Error("Missing session ID in URL");
        }

        console.log(id)
        const session = await fetchAssignmentSessionById(Number(id));
        const typeData = await fetchSectionTypes();
        
        if (!session) {
          throw new Error("Session not found");
        }

        setAssignmentSession(session);
        setAssignmentTypesData(typeData);
        console.log(assignmentSession);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch session");
        router.push("/assignments"); // إعادة التوجيه في حالة خطأ
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, router]); // أضفنا id كتبعية

  if (loading) return <div>Loading session...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="py-3 sm:p-6">
      <Header className="max-sm:pt-1 max-sm:px-5 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
        <h1 className="text-[22px] lg:text-3xl font-semibold">Update Exam Section</h1>
      </Header>
      <UpdateAssignmentSection
        assignmentsSection={assignmentSession}
        typeData={assignmentTypesData}
        id={Number(id)}
      />
    </section>
  );
};

export default UpdateExamSection;