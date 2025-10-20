import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotesApp from './components/NotesApp';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<NotesApp />} />
            <Route path="/notes" element={<NotesApp />} />
            <Route path="/notes/:id" element={<NotesApp />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
