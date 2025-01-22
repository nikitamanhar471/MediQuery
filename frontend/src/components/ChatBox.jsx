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

    // Add user message to the chat
    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput(""); // Clear the input field

    // Show typing indicator
    setIsTyping(true);

    try {
      // Send the user input to the backend API
      const response = await axios.post("http://localhost:5000/api/chat", {
        prompt: input,
      });

      // Add bot's response to the chat
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
      // Remove typing indicator
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-box">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <MessageBubble key={index} sender={msg.sender} text={msg.text} />
        ))}
        {isTyping && <div className="typing-indicator">Bot is typing...</div>}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
