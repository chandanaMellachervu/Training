import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

type Student = {
  "Reg No": string;
  [key: string]: any; // Allow any other student properties
};

const BLTraining: React.FC = () => {
  const [regNo, setRegNo] = useState('');
  const [error, setError] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(false);
  const [assessmentData, setAssessmentData] = useState<Record<string, {
    scores: {name: string, value: any}[],
    total?: number,
    average?: string
  }>>({});

  // Fetch student data when regNo changes (you might want to trigger this on button click instead)
  const fetchStudentData = async () => {
    if (!regNo.trim()) {
      setError('Please enter a registration number');
      return;
    }

    setLoading(true);
    setError('');
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`http://localhost:5000/api/students/${regNo.trim()}`);
      if (!response.ok) throw new Error('Student not found');
      
      const studentData = await response.json();
      setStudent(studentData);
      processAssessmentData(studentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch student data');
      setStudent(null);
    } finally {
      setLoading(false);
    }
  };

  // Process assessment data similar to PlacementPortal
  const processAssessmentData = (studentData: Student) => {
    const data: Record<string, {
      scores: {name: string, value: any}[],
      total?: number,
      average?: string
    }> = {};

    Object.keys(studentData).forEach((key) => {
      const match = key.match(/(.*?) Assessment (\d+)/);
      if (match) {
        const category = match[1];
        if (!data[category]) {
          data[category] = { scores: [] };
        }
        data[category].scores.push({
          name: key,
          value: studentData[key]
        });
      } else if (key.includes("Total")) {
        const category = key.replace(" Total", "");
        if (data[category]) {
          data[category].total = studentData[key];
        }
      } else if (key.includes("Average")) {
        const category = key.replace(" Average", "");
        if (data[category]) {
          data[category].average = studentData[key];
        }
      }
    });

    setAssessmentData(data);
  };

  const handleSearch = () => {
    fetchStudentData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-6">BL Training Portal</h1>
            
            {/* Search Section */}
            <div className="mb-8">
              <label htmlFor="regNoSearch" className="block text-sm font-medium text-gray-700 mb-2">
                Registration Number
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    id="regNoSearch"
                    type="text"
                    className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Enter registration number..."
                    value={regNo}
                    onChange={(e) => {
                      setRegNo(e.target.value);
                      setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={!regNo.trim()}
                  className={`px-4 py-3 rounded-lg text-white ${
                    regNo.trim()
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  } transition-colors`}
                >
                  Search
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>

            {/* Student Details Section - Shows after search */}
            {loading && (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}

            {student && (
              <div className="mt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Assessment Results</h2>
                
                {/* Display assessment data in tables */}
                {Object.entries(assessmentData).map(([category, data]) => (
                  <div key={category} className="mb-6 bg-white rounded-lg shadow-sm overflow-hidden border">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BLTraining;