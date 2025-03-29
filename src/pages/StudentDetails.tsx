import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

const StudentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.student;
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');

  if (!student) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">No student data found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Return to Portal
        </button>
      </div>
    );
  }

  // Extract assessment data with totals and averages
  const assessmentData: Record<string, {
    scores: {name: string, value: any}[],
    total?: number,
    average?: string
  }> = {};

  Object.keys(student).forEach((key) => {
    const match = key.match(/(.*?) Assessment (\d+)/);
    if (match) {
      const category = match[1];
      if (!assessmentData[category]) {
        assessmentData[category] = { scores: [] };
      }
      assessmentData[category].scores.push({
        name: key,
        value: student[key]
      });
    } else if (key.includes("Total")) {
      const category = key.replace(" Total", "");
      if (assessmentData[category]) {
        assessmentData[category].total = student[key];
      }
    } else if (key.includes("Average")) {
      const category = key.replace(" Average", "");
      if (assessmentData[category]) {
        assessmentData[category].average = student[key];
      }
    }
  });

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Static Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col border-r border-gray-200">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-800 mb-4">Welcome</h1>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Registration Number</p>
              <p className="text-base font-semibold">{student["Reg No"]}</p>
            </div>
          </div>
        </div>

        {/* Courses Dropdown */}
        <div className="px-4 py-2 border-t border-gray-200">
          <button 
            onClick={() => setCoursesOpen(!coursesOpen)}
            className="w-full flex items-center justify-between py-2 text-gray-700 hover:text-blue-600"
          >
            <span className="font-medium">Courses</span>
            {coursesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
          
          {coursesOpen && (
            <div className="pl-4 mt-1 space-y-2">
              <button
                onClick={() => setSelectedCourse('QALR')}
                className={`w-full text-left py-1 px-2 rounded text-sm ${selectedCourse === 'QALR' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                QALR
              </button>
              <button
                onClick={() => setSelectedCourse('AWS')}
                className={`w-full text-left py-1 px-2 rounded text-sm ${selectedCourse === 'AWS' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
              >
                AWS
              </button>
            </div>
          )}
        </div>

        {/* Back button */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Back to List
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            {selectedCourse ? `${selectedCourse} Assessment Results` : 'Assessment Results'}
          </h2>
          
          {Object.entries(assessmentData)
            .filter(([category]) => !selectedCourse || category.includes(selectedCourse))
            .map(([category, data]) => (
              <div key={category} className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-semibold text-gray-700">{category} Assessments</h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Assessment</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.scores.map((score) => (
                      <tr key={score.name} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{score.name}</td>
                        <td className="px-4 py-3 text-sm">{score.value}</td>
                      </tr>
                    ))}
                    {data.total !== undefined && (
                      <tr className="bg-blue-50 font-medium">
                        <td className="px-4 py-3 text-sm text-blue-700">{category} Total</td>
                        <td className="px-4 py-3 text-sm">{data.total}</td>
                      </tr>
                    )}
                    {data.average !== undefined && (
                      <tr className="bg-green-50 font-medium">
                        <td className="px-4 py-3 text-sm text-green-700">{category} Average</td>
                        <td className="px-4 py-3 text-sm">{data.average}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;