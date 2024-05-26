import { styled } from "styled-components";
import PropTypes from 'prop-types';

export const SubHeading = (props) => {
  return (
    <>
      <Heading>{props.text}</Heading>
    </>
  );
};

SubHeading.propTypes = {
    text: PropTypes.string.isRequired,
  };


const Heading = styled.p`
  font-size: 1.5rem; 
  line-height: 1.2; 
  font-weight: 300; 
  color: #333; 

  
`;
