



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
  const tableStyle = {
    backgroundColor: mode === 'dark' ? '#1f2937' : '#f9fafb',
    color: mode === 'dark' ? 'white' : '#374151',
    fontSize: '1.25rem', // Base font size
    '@media (max-width: 640px)': { // Mobile styles
      fontSize: '0.875rem'
    }
  };

  const headerStyle = {
    backgroundColor: mode === 'dark' ? '#374151' : '#e5e7eb',
    color: mode === 'dark' ? 'white' : '#1f2937',
    fontWeight: '600',
    fontSize: "20px",
    padding: '20px 20px',
    '@media (max-width: 640px)': {
      fontSize: '14px',
      padding: '12px 12px'
    }
  };

  const cellStyle = {
    padding: '20px 20px',
    '@media (max-width: 640px)': {
      padding: '12px 12px'
    }
  };

  return (
    <div className="max-sm:text-sm">
      <Table
        data={fakeStudents}
        rowClassName={`${mode === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
        style={tableStyle}
        headerHeight={70}
        rowHeight={65}
        autoHeight
        className="custom-scrollbar-table"
      >
        {/* Checkbox Column */}
        <Column width={80} fixed>
          <HeaderCell style={headerStyle}>
            <input
              type="checkbox"
              checked={checkAll}
              onChange={handleCheckAll}
              className="w-6 h-6 accent-[var(--primary-color1)] max-sm:w-4 max-sm:h-4"
            />
          </HeaderCell>
          <Cell style={cellStyle}>
            {rowData => (
              <input
                type="checkbox"
                checked={selectedIds.includes(rowData.id)}
                onChange={() => handleCheck(rowData.id)}
                className="w-6 h-6 accent-[var(--primary-color1)] max-sm:w-4 max-sm:h-4"
              />
            )}
          </Cell>
        </Column>

        {/* Columns mapping */}
        {[
          // Reduced widths for mobile
          { label: 'Student Name', dataKey: 'name', width: 220 },
          { label: 'Student ID', dataKey: 'id', width: 170 },
          { label: 'Email', dataKey: 'email', width: 260 },
          { label: 'Submission Time', dataKey: 'submissionTime', width: 200 },
          { label: 'Duration', dataKey: 'duration', width: 140 },
          { label: 'Score', dataKey: 'score', width: 140 },
          { label: 'Correct Answers', dataKey: 'correct', width: 170 },
          { label: 'Wrong Answers', dataKey: 'incorrect', width: 170 },
          { label: 'Status', dataKey: 'status', width: 170 }
        ].map((column, index) => (
          <Column key={index} width={column.width}>
            <HeaderCell style={headerStyle}>{column.label}</HeaderCell>
            <Cell style={cellStyle}>
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