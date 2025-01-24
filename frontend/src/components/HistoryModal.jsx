const HistoryModal = ({ isOpen, onClose, chatHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h3>Chat History</h3>
        <ul>
          {chatHistory.map((msg, index) => (
            <li key={index} className={`history-${msg.sender}`}>
              {msg.sender === "bot" ? "Bot: " : "You: "}
              {msg.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryModal; // Ensure it's exported this way
