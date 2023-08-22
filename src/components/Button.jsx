import { Link } from "react-router-dom";

function Button() {
  return (
    <div className="btn__holder">
      <Link to={-1}>
        <button className="btn-back">
          <i className="fa-solid fa-arrow-left-long"></i> Back
        </button>
      </Link>
    </div>
  );
}
export default Button;
