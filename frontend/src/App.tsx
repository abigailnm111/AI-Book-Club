import React, { useState } from 'react';
import './App.css';

interface BookAnalysisResponse {
  success: boolean;
  data?: {
    summary: string;
    discussion_questions: string[];
  };
  error?: string;
  book_path?: string;
}

function App() {
  const [pdfPath, setPdfPath] = useState('');
  const [analysis, setAnalysis] = useState<BookAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeBook = async () => {
    if (!pdfPath.trim()) {
      alert('Please enter a PDF path');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/analyze-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdf_path: pdfPath }),
      });

      const result: BookAnalysisResponse = await response.json();
      setAnalysis(result);
    } catch (error) {
      console.error('Error analyzing book:', error);
      setAnalysis({
        success: false,
        error: 'Failed to analyze book. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisResult = () => {
    if (!analysis) return null;

    if (analysis.success && analysis.data) {
      return (
        <div className="success-result">
          <h3>Analysis Complete</h3>
          {analysis.book_path && (
            <p className="book-path">
              <strong>Book:</strong> {analysis.book_path}
            </p>
          )}
          
          <div className="analysis-content">
            <div className="summary-section">
              <h4>Summary</h4>
              <p>{analysis.data.summary}</p>
            </div>
            
            <div className="questions-section">
              <h4>Discussion Questions</h4>
              <ol>
                {analysis.data.discussion_questions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="error-result">
          <h3>Error</h3>
          <p>{analysis.error}</p>
        </div>
      );
    }
  };

  // Function to create symmetrical rainbow text effect with proportional scaling
  const createRainbowText = (text: string) => {
    const letters = text.split('');
    const totalLetters = letters.length;
    
    return letters.map((letter, index) => {
      // Calculate proportional distance from center (0 = center, 1 = edge)
      const center = (totalLetters) / 2;
      const distanceFromCenter = Math.abs(index - center);
      const maxDistance = center;
                  
      // Both yOffset and rotation scale proportionally with distance from center
      const yOffset = distanceFromCenter * 5; // Vertical curve
      const rotationAngle = ((index - center) / maxDistance) * 18; // Rotation
      
      return (
        <span
          key={index}
          style={{
            transform: `translateY(${yOffset}px) rotate(${rotationAngle}deg)`,
            display: 'inline-block',
            margin: '0 1px',
            transformOrigin: 'center bottom'
          }}
        >
          {letter}
        </span>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {createRainbowText('AI Book Club')}
        </h1>
        <p>Discover the magic of books through AI-powered analysis and discussion</p>
      </header>

      <main className="App-main">
        <div className="analysis-section">
          <h2>Analyze Book from PDF</h2>
          <div className="input-group">
            <label htmlFor="pdfPath">PDF File Path:</label>
            <input
              id="pdfPath"
              type="text"
              value={pdfPath}
              onChange={(e) => setPdfPath(e.target.value)}
              placeholder="Enter path to PDF file (e.g., the_little_prince.pdf)"
            />
            <button 
              onClick={analyzeBook} 
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? 'Analyzing...' : 'Analyze Book'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="results-section">
            <h2>Results</h2>
            {renderAnalysisResult()}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
