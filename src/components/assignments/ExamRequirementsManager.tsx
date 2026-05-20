// "use client";
// import { Button, Modal, Select, Spin } from "antd";
// import axios from "axios";
// import { Loader2, TrashIcon } from "lucide-react";
// import { useEffect, useState } from "react";
// import { FiPlus } from "react-icons/fi";
// import { toast } from "sonner";

// const ExamRequirementsManager = ({
//   formId,
//   requirements,
//   assignmentId,
//   onUpdate,
// }: {
//   formId: number;
//   requirements: any[];
//   assignmentId: number;
//   onUpdate: () => void;
// }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [availableFields, setAvailableFields] = useState<any[]>([]);
//   const [fieldsRquirmentsForms, setFieldsRquirmentsForms] = useState<any[]>([]);
//   const [selectedFields, setSelectedFields] = useState<number[]>([]);
//   const [loadingFields, setLoadingFields] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isDeleting, setIsDeleting] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchFieldsRequirmentsForm = async () => {
//       const response = await axios.get("/assignment/field-requirement-forms");
//       console.log(response);
//       setFieldsRquirmentsForms(response.data.data);
//     };
//     fetchFieldsRequirmentsForm();
//   }, []);
//   useEffect(() => {
//     if (isAdding) {
//       fetchAvailableFields();
//     }
//   }, [isAdding]);

//   const fetchAvailableFields = async () => {
//     try {
//       setLoadingFields(true);
//       const response = await axios.get("/assignment/field-requirements");
//       console.log(response.data.data);
//       setAvailableFields(response.data?.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch field requirements");
//       setAvailableFields([]);
//     } finally {
//       setLoadingFields(false);
//     }
//   };

//   const handleAddRequirements = async () => {
//     if (selectedFields.length === 0) {
//       toast.warning("Please select at least one requirement");
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const requests = selectedFields.map((fieldId) => {
//         console.log(formId, fieldId);
//         axios.post("/assignment/field-requirement-forms", {
//           form_id: formId,
//           field_requirement_id: fieldId,
//         });
//       });

//       await Promise.all(requests);

//       toast.success("Requirements added successfully");
//       setSelectedFields([]);
//       setIsAdding(false);
//       onUpdate();
//     } catch (error) {
//       toast.error("Failed to add requirements");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteRequirement = async (id: number) => {
//     const fieldRequirmentToDelete = fieldsRquirmentsForms.find(
//       (item) => item.field_requirement_id === id && item.form_id === formId
//     );
//     console.log(fieldRequirmentToDelete.id);

//     Modal.confirm({
//       title: "Delete Requirement",
//       content: "Are you sure you want to delete this requirement?",
//       okText: "Delete",
//       okButtonProps: {
//         danger: true,
//       },
//       cancelText: "Cancel",
//       onOk: async () => {
//         setIsDeleting(id);
//         console.log(id);
//         try {
//           await axios.delete(
//             `/assignment/field-requirement-forms/${fieldRequirmentToDelete.id}`
//           );
//           toast.success("Requirement deleted successfully");
//           onUpdate();
//         } catch (error) {
//           toast.error("Failed to delete requirement");
//         } finally {
//           setIsDeleting(null);
//         }
//       },
//     });
//   };

//   return (
//     <div className="space-y-3">
//       {requirements.map((req) => (
//         <div
//           key={req.id}
//           className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
//         >
//           <span>{req.name}</span>
//           <Button
//             onClick={() => handleDeleteRequirement(req.id)}
//             disabled={isDeleting === req.id}
//             type="text"
//             danger
//             icon={
//               isDeleting === req.id ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 <TrashIcon className="size-4" />
//               )
//             }
//           />
//         </div>
//       ))}

//       {isAdding ? (
//         <div className="space-y-2 mt-2">
//           <Spin spinning={loadingFields}>
//             <Select
//               mode="multiple"
//               style={{ width: "100%" }}
//               placeholder="Select requirements"
//               value={selectedFields}
//               onChange={setSelectedFields}
//               options={availableFields
//                 .filter(
//                   (field) => !requirements.some((req) => req.id === field.id)
//                 )
//                 .map((field) => ({
//                   value: field.id,
//                   label: field.name,
//                 }))}
//               className="dark:[&>div]:!bg-gray-800 dark:[&>div]:!text-white
//               dark:[&>div]:placeholder:!text-gray-300
//               dark:[&>div]:!border-gray-600"
//             />
//           </Spin>
//           <div className="flex gap-2 justify-end">
//             <Button
//               onClick={() => {
//                 setIsAdding(false);
//                 setSelectedFields([]);
//               }}
//               type="default"
//               className="dark:!text-white !bg-transparent dark:!border-gray-600"
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAddRequirements}
//               type="primary"
//               loading={isSubmitting}
//             >
//               Add Selected
//             </Button>
//           </div>
//         </div>
//       ) : (
//         <Button
//           onClick={() => setIsAdding(true)}
//           type="dashed"
//           className="mt-2 flex items-center gap-1 dark:!bg-gray-800 dark:text-white dark:!border-gray-600"
//           icon={<FiPlus size={14} />}
//         >
//           Add Requirement
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ExamRequirementsManager;

"use client";
import { Button, Modal, Select, Spin } from "antd";
import axios from "axios";
import { Loader2, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "sonner";

const ExamRequirementsManager = ({
  formId,
  requirements,
  assignmentId,
  onUpdate,
}: {
  formId: number;
  requirements: any[];
  assignmentId: number;
  onUpdate: () => void;
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [availableFields, setAvailableFields] = useState<any[]>([]);
  const [fieldsRequirementsForms, setFieldsRequirementsForms] = useState<any[]>(
    []
  );
  const [selectedFields, setSelectedFields] = useState<number[]>([]);
  const [loadingFields, setLoadingFields] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  useEffect(() => {
    const fetchFieldsRequirementsForm = async () => {
      try {
        const response = await axios.get("/assignment/field-requirement-forms");
        setFieldsRequirementsForms(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch field requirement forms");
      }
    };
    fetchFieldsRequirementsForm();
  }, [formId]); // Added formId as dependency

  useEffect(() => {
    if (isAdding) {
      fetchAvailableFields();
    }
  }, [isAdding]);

  const fetchAvailableFields = async () => {
    try {
      setLoadingFields(true);
      const response = await axios.get("/assignment/field-requirements");
      setAvailableFields(response.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch field requirements");
      setAvailableFields([]);
    } finally {
      setLoadingFields(false);
    }
  };

  const handleAddRequirements = async () => {
    if (selectedFields.length === 0) {
      toast.warning("Please select at least one requirement");
      return;
    }

    try {
      setIsSubmitting(true);

      const requests = selectedFields.map((fieldId) =>
        axios.post("/assignment/field-requirement-forms", {
          form_id: formId,
          field_requirement_id: fieldId,
        })
      );

      await Promise.all(requests);
      toast.success("Requirements added successfully");
      setSelectedFields([]);
      setIsAdding(false);
      onUpdate();
    } catch (error) {
      toast.error("Failed to add requirements");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteRequirement = async (id: number) => {
    const fieldRequirementToDelete = fieldsRequirementsForms.find(
      (item) => item.field_requirement_id === id && item.form_id === formId
    );

    if (!fieldRequirementToDelete) {
      toast.error("Requirement not found");
      return;
    }

    Modal.confirm({
      title: "Delete Requirement",
      content: "Are you sure you want to delete this requirement?",
      okText: "Delete",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      onOk: async () => {
        setIsDeleting(id);
        try {
          await axios.delete(
            `/assignment/field-requirement-forms/${fieldRequirementToDelete.id}`
          );
          toast.success("Requirement deleted successfully");
          onUpdate();
        } catch (error) {
          toast.error("Failed to delete requirement");
        } finally {
          setIsDeleting(null);
        }
      },
    });
  };

  return (
    <div className="space-y-3">
      {requirements.map((req) => (
        <div
          key={req.id}
          className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded"
        >
          <span>{req.name}</span>
          <Button
            onClick={() => handleDeleteRequirement(req.id)}
            disabled={isDeleting === req.id}
            type="text"
            danger
            icon={
              isDeleting === req.id ? (
                <Loader2 className="animate-spin" />
              ) : (
                <TrashIcon className="size-4" />
              )
            }
          />
        </div>
      ))}

      {isAdding ? (
        <div className="space-y-2 mt-2">
          <Spin spinning={loadingFields}>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select requirements"
              value={selectedFields}
              onChange={setSelectedFields}
              options={availableFields
                .filter(
                  (field) => !requirements.some((req) => req.id === field.id)
                )
                .map((field) => ({
                  value: field.id,
                  label: field.name,
                }))}
              className="dark:[&>div]:!bg-gray-800 dark:[&>div]:!text-white 
              dark:[&>div]:placeholder:!text-gray-300 
              dark:[&>div]:!border-gray-600"
            />
          </Spin>
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => {
                setIsAdding(false);
                setSelectedFields([]);
              }}
              type="default"
              className="dark:!text-white !bg-transparent dark:!border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddRequirements}
              type="primary"
              loading={isSubmitting}
            >
              Add Selected
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          type="dashed"
          className="mt-2 flex items-center gap-1 dark:!bg-gray-800 dark:text-white dark:!border-gray-600"
          icon={<FiPlus size={14} />}
        >
          Add Requirement
        </Button>
      )}
    </div>
  );
};

export default ExamRequirementsManager;
