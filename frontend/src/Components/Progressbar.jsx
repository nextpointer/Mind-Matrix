import PropTypes from 'prop-types';
import styled from 'styled-components';

const Percent = styled.div`
  width: 150px;
  height: 150px;
  position: relative;
`;

const SVG = styled.svg`
  width: 150px;
  height: 150px;
  position: relative;
`;

const Circle = styled.circle`
  width: 150px;
  height: 150px;
  fill: none;
  stroke-width: 9;
  transform: translate(5px, 5px);
  stroke-dasharray: 440;
  stroke-dashoffset: ${props => props.offset};
  stroke-linecap: round;
  &:nth-child(1) {
    stroke: #f3f3f3;
    stroke-dashoffset: 0;
  }
  &:nth-child(2) {
    stroke: #787878;
  }
`;

const Num = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: #111;
`;

const H2 = styled.h2`
  font-size: 48px;
  span {
    font-size: 24px;
  }
`;

// Uncomment if needed
// const Text = styled.h2`
//   padding: 10px 0 0;
//   color: #999;
//   font-weight: 700;
//   letter-spacing: 1px;
// `;

const Progressbar = ({ percentage }) => {
  const offset = 440 - (440 * percentage) / 100;

  return (
      <Percent>
        <SVG>
          <Circle cx="70" cy="70" r="70" offset="0" />
          <Circle cx="70" cy="70" r="70" offset={offset} />
        </SVG>
        <Num>
          <H2>{percentage}<span>%</span></H2>
        </Num>
      </Percent>
  );
};

Progressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progressbar;
