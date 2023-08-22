import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [theme, setTheme] = useState("theme-dark");

  const handleTheme = () => {
    const newTheme = theme === "theme-light" ? "theme-dark" : "theme-light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="holder">
          <Link to={"/"}>
            <h1>Where in the world ?</h1>
          </Link>
          <button onClick={handleTheme} className="btn">
            <span>
              {theme === "theme-light" ? (
                <i className="fa-regular fa-moon"></i>
              ) : (
                <i className="fa-regular fa-sun"></i>
              )}
            </span>{" "}
            {theme === "theme-dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header;
