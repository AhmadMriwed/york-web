
import { InterfaceModal } from "@/components/assignments/assignmentSessionA/InterfaceModal";
const EndInterface = () => {
  const mockModalData2 = {
    title: "Ending Interface",
    subTitle: "Essential documentation for new users",
    description: "This comprehensive guide will walk you through all the key features...",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    files: [
      { name: "User Manual.pdf", url: "https://example.com/files/user-manual.pdf", size: 1024 },
      { name: "Quick Start Guide.docx", url: "https://example.com/files/quick-start.docx", size: 1024 },
      { name: "API Reference v2.3", url: "https://example.com/files/api-reference.pdf" , size: 1024}
    ],
    link: "https://help.example.com/getting-started"
  };

  return <InterfaceModal {...mockModalData2} header={"End Interface"} />;
};

export default EndInterface;