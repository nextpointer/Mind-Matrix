import '../styles/ComponentStyle/card.css/';
import NormalButtons from './NormalButton';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export const Card = (props) => {
  const navigate = useNavigate()
  const handlesubmit = (event) => {
    event.preventDefault();
    navigate(props.link);
  };
  return (
      < div className="box" >
        <span className="title" style={{color:"black"}}>{props.header}</span>
        <div>
          <strong style={{color:"black"}}>{props.about}</strong>
          <form onSubmit={handlesubmit}>
          <NormalButtons text='Take Test' type='submit' />
          </form>
        </div>
    </div>
  );
};

Card.propTypes = {
link: PropTypes.string.isRequired,
header: PropTypes.string.isRequired,
about: PropTypes.string.isRequired,
};
