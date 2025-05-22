import React from 'react';

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
        <div className="spinner-container">
          <div className="custom-spinner"></div>
        </div>
      )}

      {status && <div className="status-message">{status}</div>}

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
