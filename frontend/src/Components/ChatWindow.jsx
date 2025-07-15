
import PropTypes from 'prop-types';
import MessageList from './MessageList';

const ChatWindow = ({ messages }) => {
  
  return (
    <div style={styles.chatWindow}>
      <MessageList messages={messages} />
    </div>
  );
};

const styles = {
  chatWindow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    // backgroundColor: '#c870b2',
    padding: '20px',
    paddingBottom: '5rem'
  },
};

ChatWindow.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatWindow;
