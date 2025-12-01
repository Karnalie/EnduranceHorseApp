import { useState } from 'react';
import './App.css';

const STORAGE_KEY = 'HORSE_DATA';

function App() {
  const [status, setStatus] = useState('');

  const handleViewHorses = () => {
    const viewSection = document.getElementById('view-horses');
    if (viewSection) {
      viewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClear = () => {
    const confirmed = window.confirm('Clear all saved horses? This cannot be undone.');
    if (!confirmed) return;

    localStorage.removeItem(STORAGE_KEY);
    setStatus('All horses cleared from storage.');

    setTimeout(() => setStatus(''), 2500);
  };

  return (
    <div className="app">
      <main className="home">
        <h1 className="title">Endurance Horse App</h1>
        <p className="description">
          Track your endurance horses, keep notes on their rides, and quickly jump into the herd
          list.
        </p>

        <div className="actions">
          <button className="primary-button" type="button" onClick={handleViewHorses}>
            View Horses
          </button>
        </div>

        <button className="link-button" type="button" onClick={handleClear}>
          Clear All Horses (Dev Only)
        </button>

        {status && <p className="status">{status}</p>}
      </main>

      <section id="view-horses" className="card" aria-live="polite">
        <p className="section-title">View Horses</p>
        <p className="section-copy">
          This is a placeholder for the herd list. Hook this section to your horses data or
          navigation once available.
        </p>
      </section>
    </div>
  );
}

export default App;
