import { styled } from "styled-components";
import PropTypes from 'prop-types';

export const MainHeading = (props) => {
  return (
    <>
      <Heading>{props.text}</Heading>
    </>
  );
};

MainHeading.propTypes = {
    text: PropTypes.string.isRequired,
  };


const Heading = styled.p`
  font-size: 5vw; /* Set main heading size */
  line-height: 1.2; /* Set suitable line height */
  font-weight: 500; /* Emphasize the heading */
  color: #333; /* Set a default dark color */

  
`;
