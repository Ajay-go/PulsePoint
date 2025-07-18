import React, { useState, useRef, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../src/firebase";
import Doc_tile_chat from "./doc_chat_tile";
import "./chat.css";
import { useNavigate } from "react-router-dom";

const TOGETHER_API_KEY = "1d0e8c838a29bc1171ff24364e2c91d3ddaeb57c3fe2db1f0bff5a0a55d33ff37a2e1"; 


async function getAIResponse(userMessages, doctorData) {
  const formattedDoctors = doctorData
    .map(
      (doc) =>
        `• ${doc.name}, Specialty: ${doc.speciality}, Location: ${doc.location || "N/A"}, Experience: ${doc.experience_years}`
    )
    .join("\n");

  const lastRelevantMessages = userMessages
    .slice()
    .reverse()
    .filter((msg) => msg.type === "user" || msg.type === "ai")
    .slice(0, 4)
    .reverse()
    .map((msg) => ({
      role: msg.type === "user" ? "user" : "assistant",
      content: msg.text,
    }));

  const response = await fetch("https://api.together.xyz/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOGETHER_API_KEY.slice(0, -5)}`, // slice if needed
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
      messages: [
        {
          role: "system",
          content: `
You are PulsePoint AI assistant.
PulsePoint is a doctor consultation and appointment booking website.
Greet the user warmly. Respond in 30–40 words.
When the user shares symptoms, explain about symptoms and possible cause in list in separate lines.
If the user asks to suggest doctors, recommend 2–3 doctors by name from the list below:
Return doctor names clearly in your response, e.g., "I recommend Dr. Neha Sharma and Dr. Raj Patel".
If user says thanks or becomes thankful to you, greet back with "Happy to help you!".
Only answer questions related to healthcare. For other topics, say: "Sorry, I can only help with healthcare-related queries."
Here is the list of available doctors:
${formattedDoctors}
        `,
        },
        ...lastRelevantMessages,
      ],
    }),
  });

  const data = await response.json();
  return data?.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
}

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorData, setDoctorData] = useState([]);
  const endRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "pulse_point"));
        const doctors = snapshot.docs.map((doc) => doc.data());
        setDoctorData(doctors);
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const extractDoctorNames = (text) => {
    const regex = /Dr\.?\s[A-Z][a-z]+\s[A-Z][a-z]+/g;
    return text.match(regex) || [];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { type: "user", text: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const aiReply = await getAIResponse(
        updatedMessages.filter((msg) => msg.type === "user" || msg.type === "ai"),
        doctorData
      );

      const aiMessage = { type: "ai", text: aiReply };
      const newMessages = [...updatedMessages, aiMessage];

      const mentionedDoctorNames = extractDoctorNames(aiReply);
      const matchedDoctors = doctorData.filter((doc) =>
        mentionedDoctorNames.some((name) =>
          doc.name.toLowerCase().includes(name.toLowerCase())
        )
      );

      const doctorComponents = matchedDoctors.map((doc, idx) => ({
        type: "component",
        component: <Doc_tile_chat key={idx} {...doc} />,
      }));

      setMessages([...newMessages, ...doctorComponents]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Error getting response from PulsePoint AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => {
            if (msg.type === "component") {
              return (
                <div key={index} className="doctor-tile-wrapper">
                  {msg.component}
                </div>
              );
            }

            return (
              <div
                key={index}
                className={
                  msg.type === "user"
                    ? "message user-message"
                    : "message ai-message"
                }
              >
                {msg.text}
              </div>
            );
          })}
          {loading && <div className="message ai-message">PulsePoint AI is typing...</div>}
          <div ref={endRef} />
        </div>

        <div className="input-box">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button onClick={handleSend} disabled={loading}>
            Send
          </button>
          <button onClick={() => navigate("/")} disabled={loading}>
            Close
          </button>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f05f70",
          color: "white",
          textAlign: "center",
          padding: "10px 0",
          fontSize: "0.9rem",
          width: "100%",
          position: "relative",
          bottom: "0",
          left: "0",
          borderRadius: "0",
          marginTop: "40px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        &copy; {new Date().getFullYear()} Pulse Point
      </div>
    </>
  );
}

export default Chat;
