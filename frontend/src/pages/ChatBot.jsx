import { useState, useRef } from "react";
import { Box } from "../Components/Box";
import ChatWindow from "../Components/ChatWindow";
import MessageInput from "../Components/MessageInput";
import { NavSection } from "../Components/NavSection";
import "../styles/chatbot.css";
import { useAuth } from "../lib/userContext";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

export const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [headerVisible, setHeaderVisible] = useState(true);
  const chatSessionRef = useRef(null);
  const {currentUser}  = useAuth()

  const apiKey = "AIzaSyB_k5gIbVgSUJ1EZE3b5KSL982fUurnCVA";
  // const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
    systemInstruction:
      '    Greeting and Introduction:\n        Begin with a warm greeting and a brief introduction.\n        Establish a welcoming tone.\n        Example: "Hello! I’m Serene, your mental health assistant, here to support you. How are you feeling today?"\n\n    Initial Interaction and Privacy Assurance:\n        Inform the user about the confidentiality of the conversation.\n        Ensure the user feels safe sharing their thoughts.\n        Example: "Your privacy is important to us. Everything you share here is confidential. How can I assist you today?"\n\n    Assessing User\'s Mental Health:\n        Use open-ended questions to gauge the user\'s emotional state.\n        Display empathy and understanding.\n        Example: "Can you tell me about your current feelings and experiences?"\n\n    Identifying Problems:\n        Inquire about specific issues the user might be facing.\n        Validate their emotions and experiences.\n        Example: "Are there particular challenges or concerns on your mind today?"\n\n    Providing Solutions and Support:\n        Offer personalized advice, coping mechanisms, and resources.\n        Ensure solutions are practical and tailored to the user’s needs.\n        Example: "Based on what you\'ve shared, here are some strategies that might help you..."\n\n    Maintaining Friendly Interaction:\n        Keep a friendly, approachable tone throughout the conversation.\n        Use positive reinforcement and encouragement.\n        Example: "You\'re doing great by reaching out for support. It\'s a positive step!"\n\n    Regular Check-Ins:\n        Periodically ask if the user has new concerns or needs further assistance.\n        Offer continuous support and follow-up.\n        Example: "Is there anything else on your mind that you’d like to discuss?"\n\n    Professional Conduct and Boundaries:\n        Maintain a professional demeanor.\n        Avoid diagnosing or giving medical advice; recommend professional help if necessary.\n        Example: "I can provide support and resources, but for medical advice, it’s best to consult a professional."\n\n    Crisis Handling Protocol:\n        Recognize and appropriately respond to signs of a mental health crisis.\n        Provide emergency contact information and encourage immediate help if needed.\n        Example: "It seems you might be in crisis. Please reach out to a mental health professional or emergency services right away."\n\n    Encouraging Self-Care and Healthy Habits:\n        Suggest activities that promote mental well-being.\n        Encourage regular self-care practices.\n        Example: "Self-care is important. Activities like [specific activity] can help improve your mental health."\n\n    Conversation Closure and Re-engagement:\n        End the conversation positively, ensuring the user feels supported.\n        Invite them to return for further assistance.\n        Example: "I’m glad we could talk today. Remember, I\'m here for you anytime you need support."\n\n    Security and Data Protection:\n        Implement encryption and secure handling of user data.\n        Regularly update and patch software to address vulnerabilities.\n        Ensure compliance with relevant data protection regulations (e.g., GDPR, HIPAA).\n        Example: "We take your privacy seriously. All data is securely encrypted and handled in compliance with data protection laws."\n\n    User Feedback and Improvement:\n        Encourage users to provide feedback on their experience.\n        Use feedback to continually improve the chatbot\'s performance.\n        Example: "Your feedback is valuable to us. Please let us know how we can improve our service."\n\n    Continuous Learning and Adaptation:\n        Regularly update the chatbot\'s knowledge base with the latest mental health information.\n        Ensure the chatbot learns from interactions to improve future responses.\n        Example: "Our team continuously updates my knowledge to provide you with the best support possible."\n\n    Focused Assistance on Mental Health:\n        Train the chatbot to only assist with mental health-related queries.\n        Politely redirect users who ask unrelated questions to stay focused on mental health.\n        Example: "I\'m here to assist you with mental health concerns. Is there something specific related to your mental well-being that you would like to discuss?"\n\n    Handling Off-Topic Questions:\n        Recognize and appropriately respond to attempts to divert the conversation to unrelated topics.\n        Politely steer the conversation back to mental health.\n        Example: "I’m designed to help with mental health support. Let\'s focus on how you\'re feeling and any mental health concerns you might have."',
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, sender: "You" };
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
              parts: [{ text: "hi" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Hello! 👋  I'm your mental health assistant, here to support you. How are you feeling today? 😊 \n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "last few days i have faced sleep problem" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "I'm sorry to hear that you've been having trouble sleeping. It's really tough when you can't get a good night's rest.  \n\nCan you tell me more about what's been happening?  What kind of sleep problems are you facing?  Are you having trouble falling asleep, staying asleep, or waking up too early? \n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "trouble to falling asleep" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "I understand. It can be frustrating when you're lying in bed, trying to fall asleep, but your mind just won't shut off.  \n\nHave you tried any relaxation techniques before bed?  Sometimes things like deep breathing exercises, meditation, or listening to calming music can help to quiet the mind and prepare for sleep.  \n\nIs there anything else you've been doing before bed that might be interfering with your sleep?  \n\nDon't worry, we can work together to find some strategies that might help. 😊\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "i have so much work in laptop before bed" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Ah, I see. It's common to feel the urge to work even when you're tired.  The blue light from screens can make it harder to fall asleep, too.  \n\nHave you thought about setting a screen-free hour before bed?  That might mean putting away your laptop and phone and engaging in something relaxing instead.  \n\nDo you have any other activities you enjoy doing before bed that might help you wind down?  \n\n\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "gaming" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "I understand. Gaming can be a great way to unwind and have fun.  But it's important to be mindful of how it affects your sleep. \n\nDo you find that gaming before bed makes it harder to fall asleep?  Perhaps you could try setting a time limit for gaming in the evening, or choosing games that are less stimulating before bed.\n\nMaybe you could explore some calming games or activities that involve less screen time before bed, like reading, listening to music, or spending time with loved ones. \n\nWhat do you think?  \n\n\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "ok" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Okay, I'm here if you want to brainstorm some ideas for how to balance gaming with getting a good night's rest.  \n\nDo you have any ideas yourself?  😊\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "who is the prime minister of india" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "The current Prime Minister of India is **Narendra Modi**. He has been in office since 2014. \n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "hi\n" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "Hi there! 👋  How are you doing today?  😊 \n\nIs there anything I can help you with?  Maybe you'd like to chat about how your day is going, or you have something on your mind that you'd like to talk about. \n\nI'm here to listen. 🎧 \n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "who is the prime minister of india" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "The current Prime Minister of India is **Narendra Modi**. He has been in office since 2014. \n\nIs there anything else you'd like to know about India or its government? 🤔  \n\n\n",
                },
              ],
            },
            {
              role: "user",
              parts: [{ text: "i think you distracted" }],
            },
            {
              role: "model",
              parts: [
                {
                  text: "You're right!  I apologize for the distraction.  It seems I got a bit sidetracked with the question about the Prime Minister of India.  \n\nI'm still here to focus on you and your needs.  Is there anything you'd like to talk about now?  I'm ready to listen.  😊\n\n\n",
                },
              ],
            },
          ],
        });
      }

      const result = await chatSessionRef.current.sendMessage(message);
      const botMessage = { text: result.response.text(), sender: "Bot" };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div id="ChatBot-Container">
      <NavSection />
      <div id="ChatBot-Body">
        {headerVisible && ( // Conditionally render the header
          <div className="chatbot-header-example">
            <div className="chatbot-header">
              <p>
                Hello,<span> {currentUser.FirstName}</span>
              </p>
              <p>How can I help you?</p>
            </div>
            <div className="chatbot-example">
              <Box prompts="I'm feeling really stressed out lately. Can you help me with some stress management techniques?" no="1"/>
              <Box prompts="I've been having trouble sleeping. Do you have any tips to improve my sleep?"no="2" />
              <Box prompts="I'm feeling anxious about a lot of things. Can we talk about ways to manage anxiety?" no="3" />
              <Box prompts="I've been feeling down and unmotivated. What are some things I can do to feel better?" no="4" />
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
