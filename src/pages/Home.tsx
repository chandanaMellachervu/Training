import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Welcome to PlacementPortal
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your gateway to career opportunities and professional growth
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Training Programs</h3>
              <p className="text-gray-600">
                Access comprehensive training materials and resources to enhance your skills
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Placement Support</h3>
              <p className="text-gray-600">
                Get guidance and support for your career placement journey
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Success Stories</h3>
              <p className="text-gray-600">
                Learn from the experiences of successfully placed students
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;