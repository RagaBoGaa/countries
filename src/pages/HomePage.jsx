import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import ReactPaginate from "react-paginate";

import Card from "./Card";
import Loader from "../ui/Loader";
import Filters from "../components/Filters";

function HomePage() {
  const countries = useLoaderData();
  const filCountries = countries.filter(
    (country) => country.capital != "Jerusalem"
  );
  const [region, setRegion] = useState("all");
  const [query, setQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(0); // Added currentPage state

  const countriesPerPage = 20; // Number of countries per page
  const offset = currentPage * countriesPerPage;

  useEffect(() => {
    setIsLoading(true);
    let filtered = filCountries;

    if (region !== "all") {
      filtered = filCountries.filter((country) => country.region === region);
    }

    if (query) {
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
    setIsLoading(false);
  }, [filCountries, region, query]);

  const handleChange = (e) => {
    setRegion(e.target.value);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
  };

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const displayedCountries = filteredCountries.slice(
    offset,
    offset + countriesPerPage
  );

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
        ) : displayedCountries.length === 0 ? (
          <p className="error__message">
            No countries match your filters. check the country / region!{" "}
          </p>
        ) : (
          displayedCountries?.map((country) => (
            <Card key={country.cca3} country={country} />
          ))
        )}
      </div>

      <section className="pagination__section">
        {filteredCountries.length > countriesPerPage && (
          <ReactPaginate
            previousLabel={<i className="fa-solid fa-arrow-left"></i>}
            nextLabel={<i className="fa-solid fa-arrow-right"></i>}
            pageCount={Math.ceil(filteredCountries.length / countriesPerPage)}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={"pagination__page"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        )}
      </section>
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
