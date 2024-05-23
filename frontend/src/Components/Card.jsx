import '../styles/ComponentStyle/card.css/';
import NormalButtons from './NormalButton';

export const Card = () => {
  return (
      < div className="box">
        <span className="title">Anxiety</span>
        <div>
          <strong>JOE WATSON SBF</strong>
          <NormalButtons text='Take Test' />
        </div>
    </div>
  );
};
