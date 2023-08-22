/* eslint-disable react-refresh/only-export-components */
import { useLoaderData, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../ui/Loader";

function CountryDetails() {
  const countryDetails = useLoaderData();
  const nativeName = Object.values(countryDetails[0].name?.nativeName).pop();
  const navigate = useNavigate();

  const handleClick = (n) => {
    navigate(`/country/${n}`);
  };

  if (countryDetails.length === 0) return <Loader />;

  return (
    <div>
      <div className="container">
        <Button />
        {countryDetails.map((country) => (
          <div className="details__holder" key={country?.cca3}>
            <div className="lft__holder">
              <img
                src={country?.flags?.svg}
                alt={`Flag of ${country?.name?.common}`}
              />
            </div>
            <div className="wrapper">
              <h2>{country?.name?.common}</h2>
              <div className="right__holder">
                <div className="text__holder">
                  <div>
                    <div className="info__holder">
                      <span className="title">Native Name: </span>
                      <span> {Object.values(nativeName?.common)}</span>
                    </div>

                    <div className="info__holder">
                      <span className="title">Population: </span>
                      <span>{country?.population?.toLocaleString()}</span>
                    </div>

                    <div className="info__holder">
                      <span className="title">Region: </span>
                      <span>{country?.region}</span>
                    </div>

                    <div className="info__holder">
                      <span className="title">Sub Region: </span>
                      <span>{country?.subregion}</span>
                    </div>

                    <div className="info__holder">
                      <span className="title">Capital: </span>
                      <span>{country?.capital}</span>
                    </div>
                  </div>
                </div>
                <div className="text__holder__right">
                  <div className="info__holder">
                    <span className="title">Top Level Domain: </span>
                    <span>{country.tld}</span>
                  </div>

                  <div className="info__holder">
                    <span className="title">Currencies: </span>
                    <span>
                      {Object.values(country?.currencies).map((currency) =>
                        Object.values(currency?.name)
                      )}
                    </span>
                  </div>

                  <div className="info__holder">
                    <span className="title">Languages: </span>
                    <span>{Object.values(country.languages).join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="border__holder">
                <div className="info__holder">
                  <span className="title">Border Countries: </span>
                  {country?.borders?.map((border) => (
                    <button onClick={() => handleClick(border)} key={border}>
                      <span className="borders">{border}</span>
                    </button>
                  )) || ""}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CountryDetails;

export async function loader({ params }) {
  const { name } = params;
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${name}`);
  if (!res.ok) {
    throw Error(
      "Could not get data for that country! Server offline or API broken. Try again later!"
    );
  }
  const data = await res.json();
  return data;
}
