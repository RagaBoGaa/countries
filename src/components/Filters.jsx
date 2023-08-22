function Filters({ handleInput, query, handleChange, region }) {
  return (
    <div className="filter">
      <div className="search">
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>{" "}
        <input
          onChange={handleInput}
          value={query}
          type="search"
          placeholder="Search for a country..."
        />
      </div>

      <select className="select" onChange={handleChange} value={region}>
        <option onChange={handleChange} value="all">
          Filter by Region{" "}
        </option>
        <option onChange={handleChange} value="Africa">
          Africa
        </option>
        <option onChange={handleChange} value="Americas">
          Americas
        </option>
        <option onChange={handleChange} value="Asia">
          Asia
        </option>
        <option onChange={handleChange} value="Europe">
          Europe
        </option>
        <option onChange={handleChange} value="Oceania">
          Oceania
        </option>
      </select>
    </div>
  );
}
export default Filters;
