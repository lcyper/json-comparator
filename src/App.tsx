import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ComparisonTool from './pages/ComparisonTool';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/compare" element={<ComparisonTool />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;