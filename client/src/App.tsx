import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ImageProcessing } from './pages/ImageProcessing';
import { BookResults } from './pages/BookResults';
import { Recommendations } from './pages/Recommendations';
import { Settings } from './pages/Settings';
import { Admin } from './pages/Admin';
import { SavedBooks } from './pages/SavedBooks';
import { BookProvider } from './contexts/BookContext';

export function App() {
  const [showResults, setShowResults] = useState(false);
  return <BookProvider>
      <Router>
        <Layout showResults={showResults}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<ImageProcessing setShowResults={setShowResults} />} />
            <Route path="/results" element={showResults ? <BookResults /> : <Navigate to="/scan" />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/saved" element={<SavedBooks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </BookProvider>;
}
