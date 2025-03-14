import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAdmin, setIsAdmin } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch userRole from localStorage and update isAdmin state
    const role = localStorage.getItem('userRole');
    setIsAdmin(role === 'admin');
  }, [setIsAdmin]); // Run once on mount

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleSignOut = () => {
    setIsAdmin(false); // Reset admin state
    localStorage.removeItem('token'); // Clear token from localStorage
    localStorage.removeItem('userRole'); // Clear userRole from localStorage
    navigate('/'); // Redirect to home page after sign-out
  };

  const handleLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8" />
            <span className="font-bold text-xl">PlacementPortal</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/placements" className="hover:text-indigo-200 transition">Placements</Link>
            <Link to="/training" className="hover:text-indigo-200 transition">Training</Link>
            {isAdmin && ( // ✅ Now checking isAdmin instead of userRole
              <Link to="/new-page" className="hover:text-indigo-200 transition">Dashboard</Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Search..." 
                className="px-2 py-1 rounded-md border text-gray-700" 
              />
              <button 
                onClick={handleSearch} 
                className="absolute right-2 top-2 text-gray-700 hover:text-gray-900"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            
            {isAdmin ? (
              <button
                onClick={handleSignOut}
                className="px-2 py-1 rounded-md bg-indigo-500 hover:bg-indigo-400 transition"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 rounded-md bg-indigo-500 hover:bg-indigo-400 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
