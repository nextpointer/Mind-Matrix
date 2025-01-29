import { useState, useRef } from "react";
import { Box } from "../Components/Box";
import ChatWindow from "../Components/ChatWindow";
import { NavSection } from "../Components/NavSection";
import "../styles/chatbot.css";
import { useAuthStore } from "../Store/authStore";
import { useLoading } from "../Store/useLoading";
import { useAlert } from "../Store/useAlert";
import { api } from "../lib/axios.config";

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [headerVisible, setHeaderVisible] = useState(true);
  const {setLoading} = useLoading();
  const {setAlert}  = useAlert()
  
  

  const { currentUser } = useAuthStore() || {};

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const onclicktoPromot = (promot) => {
    setInputMessage(promot);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputMessage.trim()) {
      // Update the messages with the user's message
      const userMessage = { text: inputMessage, sender: "You" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setHeaderVisible(false); // Hide the header once user starts chatting
      setLoading(true);
      // Send the message to the backend API
      try {
        const response = await api.post("/ai", { inputMessage });
        


        // Assuming the backend responds with the bot's message
        const botMessage = { text: response.data.response, sender: "Bot" };

        // Add the bot's message to the chat window
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error("Error sending message to backend:", error);
        const errorMessage =
        error.response?.data?.message || "Something is wrong! Please try again.";
      setAlert({ type: "error", message: errorMessage, visible: true });
      }
      finally{
        setLoading(false);
      }

      // Clear the input field
      setInputMessage('');
    }
  };

  return (
    <div id="ChatBot-Container">
      <NavSection />
      <div id="ChatBot-Body">
        {headerVisible && (
          <div className="chatbot-header-example">
            <div className="chatbot-header">
              <p>
                Hello,<span> {currentUser.FirstName}</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="chatbot-example">
              <Box prompts="I'm feeling really stressed out lately. Can you help me with some stress management techniques?" no="1" onclicks={onclicktoPromot} />
              <Box prompts="I've been having trouble sleeping. Do you have any tips to improve my sleep?" no="2" onclicks={onclicktoPromot}/>
              <Box prompts="I'm feeling anxious about a lot of things. Can we talk about ways to manage anxiety?" no="3" onclicks={onclicktoPromot}/>
              <Box prompts="I've been feeling down and unmotivated. What are some things I can do to feel better?" no="4" onclicks={onclicktoPromot}/>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="chatbot-input">
          <input
            type="text"
            value={inputMessage}
            onChange={handleChange}
            placeholder="Type a message..."
          />
          <button type="submit" className="chatbot-send">
            <img src="/Icons/send.svg" alt=">" />
          </button>
        </form>

        <div id="chatbot-interface">
          <ChatWindow messages={messages} />
        </div>
      </div>
    </div>
  );
};
