import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import HistoryModal from "./components/HistoryModal";
import "./App.css";

const TypingIndicator = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return <div className="typing-indicator">Thinking{dots}</div>;
};

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messagesEndRef = useRef(null); // Reference for the bottom of the chat

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input,
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, something went wrong. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput("");
  };

  const toggleHistoryModal = () => {
    setIsHistoryOpen(!isHistoryOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Automatically scroll to the bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <h1>MediQuery</h1>
          <p>Your AI Medical Assistant</p>
          <h5>Developed by Nikita Manhar and Team</h5>
        </div>
        <button className="clear-chat" onClick={clearChat}>
          🗑️ Clear Chat
        </button>
        <button className="clear-chat" onClick={toggleHistoryModal}>
          📜 History
        </button>
      </header>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
          >
            {msg.sender === "bot" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\n/g, "<br />"),
                }}
              />
            ) : (
              <div>{msg.text}</div>
            )}
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} /> {/* Auto-scroll anchor */}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="send-button" onClick={sendMessage}>
          ➤ Send
        </button>
      </div>
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={toggleHistoryModal}
        chatHistory={messages}
      />
    </div>
  );
};

export default App;
