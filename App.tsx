import React, { useState } from 'react';
import './index.css';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError('Error connecting to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#111827', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#1f2937', padding: 32, borderRadius: 16, boxShadow: '0 4px 24px #0008', width: 400, maxWidth: '90%' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 24, textAlign: 'center' }}>Fake News Detector</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <textarea
            style={{ width: '100%', padding: 12, borderRadius: 8, background: '#111827', color: 'white', border: '1px solid #374151', minHeight: 80 }}
            placeholder="Paste or type news text here..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            style={{ padding: 12, borderRadius: 8, background: '#2563eb', color: 'white', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: loading ? 0.6 : 1 }}
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Check News'}
          </button>
        </form>
        {result && (
          <div style={{ marginTop: 24, fontSize: 22, fontWeight: 700, color: result === 'Real' ? '#4ade80' : '#f87171', textAlign: 'center' }}>{result}</div>
        )}
        {error && (
          <div style={{ marginTop: 16, color: '#f87171', textAlign: 'center' }}>{error}</div>
        )}
        <div style={{ marginTop: 32, color: '#9ca3af', fontSize: 12, textAlign: 'center' }}>Made with ❤️ for Fake News Detection</div>
      </div>
    </div>
  );
}

export default App; 