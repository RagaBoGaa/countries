/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Card({ country }) {
  return (
    <Link to={`country/${country?.cca2}`}>
      <div className="holder">
        <img src={country?.flags?.svg} alt={country.name.common} />
        <div className="texts">
          <div className="country__name">
            <h2>{country.name.common}</h2>
          </div>
          <div>
            <span className="title">Population: </span>
            <span className="info">{country.population.toLocaleString()}</span>
          </div>

          <div className="region">
            <span className="title">Region: </span>
            <span className="info">{country.region}</span>
          </div>

          <div>
            <span className="title">Capital: </span>
            <span className="info">{country?.capital?.[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default Card;
