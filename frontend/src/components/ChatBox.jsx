import React, { useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setIsTyping(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input,
      });

      const botResponse = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error while fetching bot response:", error);
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

  return (
    <div className="chat-box">
      <header className="app-header">
        <h1>MediQuery Chat</h1>
        <button className="clear-chat" onClick={clearChat}>
          🗑️ Clear Chat
        </button>
      </header>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <footer className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          ➤ Send
        </button>
      </footer>
    </div>
  );
};

export default ChatBox;
