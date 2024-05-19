import  { useState,useRef } from 'react';
import { Box } from '../Components/Box';
import ChatWindow from '../Components/ChatWindow';
import MessageInput from '../Components/MessageInput';
import { NavSection } from '../Components/NavSection';
import '../styles/chatbot.css';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(true);
  const chatSessionRef = useRef(null);

//   const apiKey = "AIzaSyB_k5gIbVgSUJ1EZE3b5KSL982fUurnCVA";
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  ];

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, sender: 'You' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setHeaderVisible(false); // Hide the header

    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = model.startChat({
          generationConfig,
          safetySettings,
          history: [
            {
              role: "user",
              parts: [
                {text: "now you are a stress helper who help the user from getting any type of mental health issue.First try to understand the user and give solution to them."},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "I'm here to listen and offer support, but please understand that I'm an AI and can't provide medical advice or diagnose mental health conditions. If you're experiencing serious distress, please reach out to a mental health professional or a crisis hotline. \n\nTo help me understand you better, can you tell me:\n\n* **What's going on?** What are you feeling right now? \n* **What's causing you stress?**  Is it a specific situation, a pattern of thoughts, or something else? \n* **What have you tried so far?** Have you tried any coping mechanisms or strategies?\n\nOnce I have a better understanding, I can offer some helpful resources and tips that might be beneficial for you.  Remember, you're not alone. \n\n**Here are some things that may help in the meantime:**\n\n* **Take deep breaths:**  Slow, deep breaths can help calm your nervous system.\n* **Practice mindfulness:** Focus on your senses and the present moment.\n* **Move your body:** Exercise can be a great way to release stress.\n* **Connect with someone:** Talking to a friend, family member, or therapist can provide support.\n\nPlease be open and honest with me, and I'll do my best to help you find some relief. \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "hi i am surajit\n\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Hi Surajit! 👋 It's nice to meet you.  What's on your mind today?  Are you feeling stressed or overwhelmed?  I'm here to listen without judgment and offer any support I can.  \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "my mood is so down\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "I'm sorry to hear that, Surajit.  It's tough when your mood is down.  Can you tell me a little more about what's making you feel this way?  Sometimes just talking about it can help. \n\nIs there anything specific happening right now that's contributing to your low mood, or is it more of a general feeling? \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "my girl friend cheat on me\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Surajit, I'm so sorry to hear that.  It's completely understandable that you're feeling down after something like that.  Being cheated on is a deeply painful experience, and it's okay to feel hurt, angry, and confused.  \n\nIs there anything you'd like to talk about?  Do you want to vent, or do you need some advice on how to cope? I'm here to listen and offer any support I can. \n\n\n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "who was the prime minister of india\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "That's a great question!  The current Prime Minister of India is **Narendra Modi**.  He has been in office since 2014.  \n\nIs there anything else you'd like to ask about India or politics? 😊 \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "you are stress helper.Why u answer this type of question\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "You are absolutely right! I apologize for getting sidetracked.  My focus should be on helping you cope with the stress of your situation, not answering random trivia questions.  \n\nIt's easy for me to get caught up in conversations, especially when they are interesting.  But I'm here for you, Surajit.  \n\nCan we go back to talking about your girlfriend cheating on you?  How are you feeling about it now?  What kind of support do you need right now?  \n"},
              ],
            },
            {
              role: "user",
              parts: [
                {text: "how many fingers in one hand\n"},
              ],
            },
            {
              role: "model",
              parts: [
                {text: "Okay, I see you're trying to distract yourself.  It's normal to try to avoid painful emotions, but it's important to address them so you can heal.\n\nThere are **five** fingers on one hand.  But let's focus on your situation, okay? \n\nDo you want to talk about how you're feeling about your girlfriend cheating on you?  I'm here to listen without judgment. \n"},
              ],
            },
          ],
        });
      }

      const result = await chatSessionRef.current.sendMessage(message);
      const botMessage = { text: result.response.text(), sender: 'Bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div id="ChatBot-Container">
      <NavSection />
      <div id="ChatBot-Body">
        {headerVisible && ( // Conditionally render the header
          <div className="chatbot-header-example">
            <div className="chatbot-header">
              <p>Hello,<span> John</span></p>
              <p>How can I help you?</p>
            </div>
            <div className="chatbot-example">
              <Box />
              <Box />
              <Box />
              <Box />
            </div>
          </div>
        )}
        <MessageInput onSendMessage={handleSendMessage} />
        <div id="chatbot-interface">
          <ChatWindow messages={messages} />
        </div>
      </div>
    </div>
  );
};
