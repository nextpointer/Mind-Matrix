import '../styles/ComponentStyle/MeditationCard.css';
import NormalButtons from './NormalButton';

function MeditationCard() {
  return (
      <div className="cardsss">
        <img src="/images/mA.jpg" alt="" />
        <div className="card-content">
          <h2>
            Card Heading
          </h2>
          <p>
            Lorem, ipsum dolor sit amet 
          </p>
          <NormalButtons type="submit" text="Explore"/>
        </div>
      </div>
  );
}

export default MeditationCard;
