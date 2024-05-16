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
  font-size: 1.5rem; /* Set main heading size */
  line-height: 1.2; /* Set suitable line height */
  font-weight: 200; /* Emphasize the heading */
  color: #333; /* Set a default dark color */

  
`;
