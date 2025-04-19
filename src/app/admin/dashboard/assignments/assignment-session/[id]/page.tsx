"use client";
import React from "react";
import { useRouter } from "next/navigation";

const AssignmentDetailsPage = () => {
  const router = useRouter();

  // Fake Data for Assignment Section
  const assignmentSection = {
    code: "ASG123",
    image: "https://via.placeholder.com/150",
    title: "Introduction to React",
    category: "Programming",
    venue: "Online Platform",
    trainer: "John Doe",
    startDate: "2023-11-01",
    endDate: "2023-11-15",
    description: "Learn the fundamentals of React and build amazing UIs.",
    applicantsCount: 45,
    isActive: true,
    trainerRating: 4.7,
    traineeRating: 4.5,
  };

  // Fake Data for Pre-Exam
  const preExam = {
    title: "React Basics Pre-Exam",
    language: "English",
    scorePercentage: 80,
    questionsCount: 20,
    applicantsCount: 40,
    hours: 2,
    type: "Pre-Exam",
    code: "PRE101",
    isActive: true,
    startDate: "2023-11-01",
    endDate: "2023-11-05",
  };

  // Fake Data for Post-Exam
  const postExam = {
    title: "React Advanced Post-Exam",
    language: "English",
    scorePercentage: 85,
    questionsCount: 25,
    applicantsCount: 38,
    hours: 3,
    type: "Post-Exam",
    code: "POST101",
    isActive: true,
    startDate: "2023-11-10",
    endDate: "2023-11-15",
  };

  // Fake Data for Trainer Evaluation
  const trainerEvaluation = {
    type: "Trainer Evaluation",
    overallRating: 4.7,
    evaluatedTrainees: 35,
    isActive: true,
    startDate: "2023-11-01",
    endDate: "2023-11-15",
  };

  // Fake Data for Trainee Evaluation
  const traineeEvaluation = {
    type: "Trainee Evaluation",
    overallRating: 4.5,
    isActive: true,
    startDate: "2023-11-01",
    endDate: "2023-11-15",
  };

  // Fake Data for Students List
  const studentsList = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      id: "STU001",
      preExam: { timeSpent: "1h 30m", submissionTime: "2023-11-03", score: 85 },
      postExam: { timeSpent: "2h 15m", submissionTime: "2023-11-12", score: 90 },
      improvementPercentage: 5.88,
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      id: "STU002",
      preExam: { timeSpent: "1h 45m", submissionTime: "2023-11-04", score: 78 },
      postExam: { timeSpent: "2h 30m", submissionTime: "2023-11-13", score: 88 },
      improvementPercentage: 12.82,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assignment Section Details</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => router.push("/admin/dashboard/assignments")}
        >
          Back to Assignments
        </button>
      </div>

      {/* Section Overview */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <img src={assignmentSection.image} alt="Assignment Image" className="w-32 h-32 object-cover rounded" />
          <div>
            <h2 className="text-xl font-semibold">{assignmentSection.title}</h2>
            <p className="text-gray-500">Category: {assignmentSection.category}</p>
            <p className="text-gray-500">
              Venue & Trainer: {assignmentSection.venue} - {assignmentSection.trainer}
            </p>
            <p className="text-gray-500">
              Dates: {assignmentSection.startDate} to {assignmentSection.endDate}
            </p>
            <p className="text-gray-500">Applicants: {assignmentSection.applicantsCount}</p>
            <p className="text-gray-500">
              Status: {assignmentSection.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{assignmentSection.description}</p>
        <div className="mt-4">
          <p>Trainer Rating: {assignmentSection.trainerRating}/5</p>
          <p>Trainee Rating: {assignmentSection.traineeRating}/5</p>
        </div>
      </div>

      {/* Exams Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pre-Exam */}
          <div className="border p-4 rounded">
            <h3 className="font-medium">{preExam.title}</h3>
            <p>Type: {preExam.type}</p>
            <p>Language: {preExam.language}</p>
            <p>Score Percentage: {preExam.scorePercentage}%</p>
            <p>Questions Count: {preExam.questionsCount}</p>
            <p>Applicants: {preExam.applicantsCount}</p>
            <p>Hours: {preExam.hours}</p>
            <p>Status: {preExam.isActive ? "Active" : "Inactive"}</p>
            <p>Dates: {preExam.startDate} to {preExam.endDate}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>

          {/* Post-Exam */}
          <div className="border p-4 rounded">
            <h3 className="font-medium">{postExam.title}</h3>
            <p>Type: {postExam.type}</p>
            <p>Language: {postExam.language}</p>
            <p>Score Percentage: {postExam.scorePercentage}%</p>
            <p>Questions Count: {postExam.questionsCount}</p>
            <p>Applicants: {postExam.applicantsCount}</p>
            <p>Hours: {postExam.hours}</p>
            <p>Status: {postExam.isActive ? "Active" : "Inactive"}</p>
            <p>Dates: {postExam.startDate} to {postExam.endDate}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Evaluations Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Evaluations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trainer Evaluation */}
          <div className="border p-4 rounded">
            <h3 className="font-medium">{trainerEvaluation.type}</h3>
            <p>Overall Rating: {trainerEvaluation.overallRating}/5</p>
            <p>Evaluated Trainees: {trainerEvaluation.evaluatedTrainees}</p>
            <p>Status: {trainerEvaluation.isActive ? "Active" : "Inactive"}</p>
            <p>Dates: {trainerEvaluation.startDate} to {trainerEvaluation.endDate}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>

          {/* Trainee Evaluation */}
          <div className="border p-4 rounded">
            <h3 className="font-medium">{traineeEvaluation.type}</h3>
            <p>Overall Rating: {traineeEvaluation.overallRating}/5</p>
            <p>Status: {traineeEvaluation.isActive ? "Active" : "Inactive"}</p>
            <p>Dates: {traineeEvaluation.startDate} to {traineeEvaluation.endDate}</p>
            <div className="mt-2 space-x-2">
              <button className="bg-green-500 text-white px-2 py-1 rounded">View Details</button>
              <button className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Students List</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pre-Exam Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post-Exam Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Improvement (%)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {studentsList.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.email || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.preExam.score}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.postExam.score}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.improvementPercentage.toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Operations Buttons */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Operations</h2>
        <div className="space-x-4">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            {assignmentSection.isActive ? "Deactivate" : "Activate"}
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Export as Word</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Export as Excel</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetailsPage;