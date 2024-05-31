import '../styles/ComponentStyle/MeditationCard.css';
import NormalButtons from './NormalButton';

function MeditationCard(props) {
  return (
      <div className="cardsss">
        <img src={props.image} alt="Meditation" />
        <div className="card-content">
          <h2>
            {props.name}
          </h2>
          <p>
            {props.about}
          </p>
          <NormalButtons type="submit" text="Explore"/>
        </div>
      </div>
  );
}

export default MeditationCard;
