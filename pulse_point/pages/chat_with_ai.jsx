import React, { useState, useRef, useEffect } from "react";
import "./chat.css"; // Style this file accordingly

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new message added
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = { type: "ai", text: `AI: Response to "${input.trim()}"` };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chat-container">
      <div id="message_box" className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.type === "user" ? "message user-message" : "message ai-message"}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
