



"use client";
import { Table } from 'rsuite';
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useContext, useState } from 'react';

const { Column, HeaderCell, Cell } = Table;

const StudentResultsTable = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [checkAll, setCheckAll] = useState(false);

  // Fake data
  const fakeStudents = [
    {
      id: 101,
      name: "Mohamed Ahmed",
      email: "mohamed@example.com",
      submissionTime: "2024-03-15 10:30",
      duration: "85 mins",
      score: 92,
      correct: 45,
      incorrect: 5,
      status: "Excellent"
    },
    {
      id: 102,
      name: "Fatima Hassan",
      email: "fatima@example.com",
      submissionTime: "2024-03-15 11:15",
      duration: "88 mins",
      score: 78,
      correct: 39,
      incorrect: 11,
      status: "Very Good"
    }
  ];
  const handleCheckAll = () => {
    setCheckAll(!checkAll);
    setSelectedIds(checkAll ? [] : fakeStudents.map(student => student.id));
  };

  const handleCheck = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };
  const statusColor = (status: string) => {
    switch (status) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
    }
  };
  // const tableStyle = {
  //   backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
  //   color: mode === 'dark' ? 'white' : '#374151',
  //   fontSize: '1.25rem', // Base font size
  //   '@media (max-width: 640px)': { // Mobile styles
  //     fontSize: '0.875rem'
  //   }
  // };

  // const headerStyle = {
  //   backgroundColor: mode === 'dark' ? '#374151' : '#e5e7eb',
  //   color: mode === 'dark' ? 'white' : '#1f2937',
  //   fontWeight: '600',
  //   fontSize: "18px",
  //   padding: '20px 20px',
  //   '@media (max-width: 640px)': {
  //     fontSize: '14px',
  //     padding: '12px 12px'
  //   }
  // };

  return (
    <div className="max-sm:text-sm">
      <Table
        data={fakeStudents}
        rowClassName={`${mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
        headerHeight={70}
        rowHeight={60}
        autoHeight
        className="custom-scrollbar-table"
      >
    
        <Column width={55} fixed>
          <HeaderCell className='pt-2 '>
            <input
              type="checkbox"
              checked={checkAll}
              onChange={handleCheckAll}
              className="w-4 h-4 accent-[var(--primary-color1)] sm:w-5 sm:h-5 "
            />
          </HeaderCell>
          <Cell className='dark:text-gray-200 text-gray-700'>
            {rowData => (
              <input
                type="checkbox"
                checked={selectedIds.includes(rowData.id)}
                onChange={() => handleCheck(rowData.id)}
                className="w-4 h-4 accent-[var(--primary-color1)] sm:w-5 sm:h-5 "
              />
            )}
          </Cell>
        </Column>

        {/* Columns mapping */}
        {[
          // Reduced widths for mobile
          { label: 'Student Name', dataKey: 'name', width: 160 },
          { label: 'Student ID', dataKey: 'id', width: 110 },
          { label: 'Email', dataKey: 'email', width: 230 },
          { label: 'Submission Time', dataKey: 'submissionTime', width: 190 },
          { label: 'Duration', dataKey: 'duration', width: 110 },
          { label: 'Score', dataKey: 'score', width: 110 },
          { label: 'Correct Answers', dataKey: 'correct', width: 160 },
          { label: 'Wrong Answers', dataKey: 'incorrect', width: 160 },
          { label: 'Status', dataKey: 'status', width: 160 }
        ].map((column, index) => (
          <Column key={index} width={column.width}>
            <HeaderCell className='text-[15px] lg:text-[16px] dark:bg-[#374151] bg-[#e5e7eb] text-[#1f2937] dark:text-white'>{column.label}</HeaderCell>
            <Cell className='text-[13px] md:text-[15px] dark:text-gray-200 text-gray-700'>
              {rowData => {
                if (column.dataKey === 'score') return `${rowData[column.dataKey]}%`;
                if (column.dataKey === 'status') return (
                  <span className={`px-4 py-2 rounded-full text-base max-sm:px-2 max-sm:py-1 max-sm:text-sm ${statusColor(rowData.status)}`}>
                    {rowData.status}
                  </span>
                );
                return rowData[column.dataKey] || 'N/A';
              }}
            </Cell>
          </Column>
        ))}
      </Table>      <style>
        {
          `

.rs-table-scrollbar-handle {
          background-color: var(--primary-color1)
}
          .rs-table-scrollbar-pressed .rs-table-scrollbar-handle {
          background-color: var(--primary-color1)
}

          `
        }
      </style>
    </div>

  );
};

export default StudentResultsTable;