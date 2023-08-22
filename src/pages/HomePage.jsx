import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../ui/Loader";
import Filters from "../components/Filters";

function HomePage() {
  const countries = useLoaderData();
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let filtered = countries;

    if (region !== "all") {
      filtered = countries.filter((country) => country.region === region);
    }

    if (query) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
    setIsLoading(false);
  }, [countries, region, query]);

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container">
      <Filters
        handleInput={handleInput}
        handleChange={handleChange}
        region={region}
        query={query}
      />
      <div className="card">
        {isLoading ? (
          <Loader />
        ) : filteredCountries.length === 0 ? (
          <p className="error__message">
            No countries match your filters. check the country / region!{" "}
          </p>
        ) : (
          filteredCountries?.map((country) => (
            <Card key={country.cca3} country={country} />
          ))
        )}
      </div>
    </div>
  );
}
export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  const fetchDa = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await fetchDa.json();
  return data;
}
