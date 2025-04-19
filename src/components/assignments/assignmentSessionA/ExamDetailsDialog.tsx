"use client";
import React, { useState } from "react";
import Header from "@/components/Pars/Header";

const ExamDetailsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState<
    "start" | "end" | null
  >(null);

  const fakeExamData = {
    title: "Introduction to React",
    sub_title: "Learn the fundamentals of React and build amazing UIs",
    image: "/placeholder.jpg", // Placeholder image URL
    language: "English",
    totalMarks: 100,
    totalQuestions: 50,
    totalStudents: 120,
    duration: 90, // in minutes
    examType: "Final",
    code: "REACT101",
    status: "Active",
    startDate: "2023-11-01T09:00:00Z",
    endDate: "2023-11-15T17:00:00Z",
    showAnswers: true,
    operations: ["Edit", "Delete", "Activate", "Deactivate", "Copy Link", "Preview"],
    excelExport: {
      titleRow: [
        "Code: REACT101",
        "Title: Introduction to React",
        "Organization: Online Platform",
        "Dates: 2023-11-01 to 2023-11-15",
        "Total Marks: 100",
        "Total Questions: 50",
        "Correct Answers: 80%",
        "Wrong Answers: 20%",
        "Exam Type: Final",
      ],
      studentData: [
        {
          name: "John Doe",
          email: "john.doe@example.com",
          id: "STU123",
          timeSpent: "85 mins",
          submissionTime: "2023-11-01T10:30:00Z",
          score: 85,
        },
        {
          name: "Jane Smith",
          email: "jane.smith@example.com",
          id: "STU124",
          timeSpent: "90 mins",
          submissionTime: "2023-11-01T11:00:00Z",
          score: 92,
        },
      ],
    },
  };

  const handleInterfaceClick = (interfaceType: "start" | "end") => {
    setSelectedInterface(interfaceType);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedInterface(null);
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto mt-6">
        <div className="flex items-center mb-4">
          <img
            src={fakeExamData.image}
            alt="Exam Cover"
            className="w-20 h-20 rounded-md mr-4"
          />
          <div>
            <h2 className="text-xl font-bold">{fakeExamData.title}</h2>
            <p className="text-gray-600">{fakeExamData.sub_title}</p>
          </div>
        </div>

        {/* Exam Details */}
        <div className="grid grid-cols-2 gap-4">
          <p>
            <strong>Language:</strong> {fakeExamData.language}
          </p>
          <p>
            <strong>Total Marks:</strong> {fakeExamData.totalMarks}
          </p>
          <p>
            <strong>Total Questions:</strong> {fakeExamData.totalQuestions}
          </p>
          <p>
            <strong>Total Students:</strong> {fakeExamData.totalStudents}
          </p>
          <p>
            <strong>Duration:</strong> {fakeExamData.duration} mins
          </p>
          <p>
            <strong>Type:</strong> {fakeExamData.examType}
          </p>
          <p>
            <strong>Code:</strong> {fakeExamData.code}
          </p>
          <p>
            <strong>Status:</strong> {fakeExamData.status}
          </p>
          <p>
            <strong>Start Date:</strong>{" "}
            {new Date(fakeExamData.startDate).toLocaleString()}
          </p>
          <p>
            <strong>End Date:</strong>{" "}
            {new Date(fakeExamData.endDate).toLocaleString()}
          </p>
          <p>
            <strong>Show Answers:</strong>{" "}
            {fakeExamData.showAnswers ? "Yes" : "No"}
          </p>
        </div>

        {/* Start and End Interfaces */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => handleInterfaceClick("start")}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Start Interface
          </button>
          <button
            onClick={() => handleInterfaceClick("end")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            End Interface
          </button>
        </div>

        {/* Operations */}
        <div className="mt-6 flex flex-wrap gap-2">
          {fakeExamData.operations.map((operation, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {operation}
            </button>
          ))}
        </div>
      </div>

      {/* Excel Export Section */}
      <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Excel Export</h3>
        <div>
          <h4 className="font-semibold">Title Row:</h4>
          <ul className="list-disc pl-6">
            {fakeExamData.excelExport.titleRow.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Student Data:</h4>
          <table className="min-w-full mt-2">
            <thead>
              <tr className="border-b">
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">ID</th>
                <th className="py-2">Time Spent</th>
                <th className="py-2">Submission Time</th>
                <th className="py-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {fakeExamData.excelExport.studentData.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.email}</td>
                  <td className="py-2">{student.id}</td>
                  <td className="py-2">{student.timeSpent}</td>
                  <td className="py-2">
                    {new Date(student.submissionTime).toLocaleString()}
                  </td>
                  <td className="py-2">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog for Interface Details */}
      {isDialogOpen && selectedInterface && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
            <h3 className="text-xl font-bold mb-4">
              {selectedInterface === "start"
                ? "Start Interface Details"
                : "End Interface Details"}
            </h3>
            <p>
              <strong>Title:</strong> {fakeExamData.title}
            </p>
            <p>
              <strong>Subtitle:</strong> {fakeExamData.sub_title}
            </p>
            <p>
              <strong>Code:</strong> {fakeExamData.code}
            </p>
            <p>
              <strong>Status:</strong> {fakeExamData.status}
            </p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View as Observer
              </button>
              <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                Edit
              </button>
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExamDetailsPage;