import React from 'react';
import { Link } from 'react-router-dom';
import { FileJson, CheckCircle, Zap, Download, ArrowRight, FileSearch } from 'lucide-react';
import FeatureCard from '../components/features/FeatureCard';

const features = [
  {
    icon: <FileSearch className="h-8 w-8 text-blue-600" />,
    title: 'Deep Comparison',
    description: 'Compare JSON files deeply, analyzing every key and value pair for differences.'
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: 'Instant Results',
    description: 'Get immediate visual feedback on missing keys and differences between files.'
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
    title: 'Easy Fixes',
    description: 'Add missing values directly in the interface with our built-in editor.'
  },
  {
    icon: <Download className="h-8 w-8 text-blue-600" />,
    title: 'Quick Export',
    description: 'Download your modified JSON files instantly with all changes applied.'
  }
];

const LandingPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-50 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Compare JSON Files</span>
                  <span className="block text-blue-600">with Ease</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
                  Effortlessly compare, analyze, and fix differences between JSON files. 
                  Perfect for developers and data analysts who need quick and accurate file comparisons.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                  <Link
                    to="/compare"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
                  >
                    Start Comparing
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Why Choose JSONCompare?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple, powerful, and efficient JSON comparison tool
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;