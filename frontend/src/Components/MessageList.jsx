import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from "react-markdown";

const MessageListContainer = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  max-width: 70%;
  ${({ alignSelf }) => alignSelf && `align-self: ${alignSelf};`}
  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}
  border-radius:10px;
`;

const MessageList = ({ messages }) => {
  return (
    <MessageListContainer>
      {messages.map((message, index) => (
        <MessageItem
          key={index}
          alignSelf={message.sender === 'You' ? 'flex-end' : 'flex-start'}
          backgroundColor={message.sender === 'You' ? '#ededed' : '#fff'}
        >
          <strong>{message.sender}:</strong><ReactMarkdown>{message.text}</ReactMarkdown>
        </MessageItem>
      ))}
    </MessageListContainer>
  );
};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MessageList;
