import React from 'react';
import { Link } from 'react-router-dom';
import { FileJson } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FileJson className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">JSONCompare</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/compare"
              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              Compare Files
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;