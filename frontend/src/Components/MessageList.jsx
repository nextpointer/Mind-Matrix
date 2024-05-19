
import PropTypes from 'prop-types';

const MessageList = ({ messages }) => {
  return (
    <div style={styles.messageList}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            ...styles.message,
            alignSelf: message.sender === 'You' ? 'flex-end' : 'flex-start',
            backgroundColor: message.sender === 'You' ? '#dcf8c6' : '#fff',
          }}
        >
          <strong>{message.sender}:</strong> {message.text}
        </div>
      ))}
    </div>
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

const styles = {
  messageList: {
    flex: 1,
    padding: '10px',
    overflowY: 'auto',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    maxWidth: '70%',
  },
};

export default MessageList;
