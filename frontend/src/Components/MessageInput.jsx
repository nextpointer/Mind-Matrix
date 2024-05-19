import { useState } from 'react';
import '../styles/chatbot.css';
import PropTypes from 'prop-types';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form  onSubmit={handleSubmit} className='chatbot-input'>
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button type="submit" className='chatbot-send'>
        <img src="/Icons/send.svg" alt=">" />
      </button>
    </form>
  );
};

MessageInput.propTypes = {
    onSendMessage: PropTypes.func.isRequired,
  };


export default MessageInput;
