import React from "react";
import "./MessageBubble.css";

const MessageBubble = ({ sender, text }) => {
  // Replace all newlines with <br /> to render line breaks properly
  const formattedText = text.replace(/\n/g, "<br />");

  return (
    <div className={`message-bubble ${sender}`}>
      {sender === "bot" ? (
        <div
          dangerouslySetInnerHTML={{
            __html: formattedText, // Ensures <br /> are properly rendered
          }}
        />
      ) : (
        <div>{text}</div>
      )}
    </div>
  );
};

export default MessageBubble;
