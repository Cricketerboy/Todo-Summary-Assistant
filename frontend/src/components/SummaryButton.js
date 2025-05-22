import React from 'react';
import { Circles } from 'react-loader-spinner';

export default function SummaryButton({ onSummarize, status, loading, summaryText }) {
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    if (summaryText) {
      setShowModal(true);
    }
  }, [summaryText]);

  return (
    <div>
      <button onClick={onSummarize} disabled={loading} className="summary-btn">
        {loading ? 'Sending to Slack...' : 'Summarize & Send to Slack'}
      </button>

      {loading && (
        <div className="spinner">
          <Circles height="40" width="40" color="#6366f1" />
        </div>
      )}

      {status && <div className="status-message">{status}</div>}

      {/* Modal for showing summary */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>📝 Summary Sent to Slack</h3>
            <p>{summaryText}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
