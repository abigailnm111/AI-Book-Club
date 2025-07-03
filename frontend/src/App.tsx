import React, { useState } from 'react';
import './App.css';

interface BookAnalysisResponse {
  success: boolean;
  data?: string;
  error?: string;
  book_path?: string;
}

function App() {
  const [pdfPath, setPdfPath] = useState('');
  const [bookText, setBookText] = useState('');
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

  const summarizeText = async () => {
    if (!bookText.trim()) {
      alert('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/summarize-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_text: bookText }),
      });

      const result: BookAnalysisResponse = await response.json();
      setAnalysis(result);
    } catch (error) {
      console.error('Error summarizing text:', error);
      setAnalysis({
        success: false,
        error: 'Failed to summarize text. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Book Club</h1>
        <p>Analyze books and generate discussion questions using AI</p>
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

        <div className="analysis-section">
          <h2>Summarize Text</h2>
          <div className="input-group">
            <label htmlFor="bookText">Book Text:</label>
            <textarea
              id="bookText"
              value={bookText}
              onChange={(e) => setBookText(e.target.value)}
              placeholder="Paste your book text here..."
              rows={5}
            />
            <button 
              onClick={summarizeText} 
              disabled={loading}
              className="analyze-btn"
            >
              {loading ? 'Summarizing...' : 'Summarize Text'}
            </button>
          </div>
        </div>

        {analysis && (
          <div className="results-section">
            <h2>Results</h2>
            {analysis.success ? (
              <div className="success-result">
                <h3>Analysis Complete!</h3>
                <pre>{analysis.data}</pre>
                {analysis.book_path && (
                  <p><strong>Book:</strong> {analysis.book_path}</p>
                )}
              </div>
            ) : (
              <div className="error-result">
                <h3>Error</h3>
                <p>{analysis.error}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
