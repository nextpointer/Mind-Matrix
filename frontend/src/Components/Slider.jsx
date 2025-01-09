// src/PhotoSlider.js
import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/ComponentStyle/PhotoSlider.css';
import NormalButtons from './NormalButton';

const Slider = ({ photos, interval = 3000000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (photos.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [photos.length, interval]);

  if (photos.length === 0) {
    return <div className="photo-slider">No photos available</div>;
  }

  return (
    <div className="photo-slider">
      <NormalButtons type='submit' text='Explore'/>
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''}`}
        >
          <img src={photo} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
};

Slider.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
  interval: PropTypes.number,
};

// Slider.defaultProps = {
//   interval: 3000,
// };

export default Slider;
