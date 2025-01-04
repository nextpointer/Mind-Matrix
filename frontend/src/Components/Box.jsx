import "../styles/ComponentStyle/box.css";
import PropTypes from "prop-types";

export const Box = ({prompts,no,onclicks}) => {
  
  return (
    <>
      <div className="card" style={{ backgroundColor: "var(--primary-color)" }} onClick={()=>onclicks(prompts)}>
        <p className="card-title">Promt {no}</p>
        <p className="small-desc">
          {prompts}
          
        </p>
        <div className="go-corner">
          <div className="go-arrow">→</div>
        </div>
      </div>
    </>
  );
};
Box.propTypes = {
  prompts: PropTypes.string.isRequired,
  no: PropTypes.string.isRequired,
};
