import { NavLink } from "react-router";
import useTheme from "../hooks/useTheme";

function Header({ searchText, setSearchText, handleSearch }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom px-4">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-bold text-danger fs-3" to="/">
                        BOOLFLIX
                    </NavLink>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="mainNav">
                        <div className="d-flex gap-2 ms-auto">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Cerca un film o una serie TV"
                                value={searchText}
                                onChange={(event) => setSearchText(event.target.value)}
                            />

                            <button className="btn btn-danger" onClick={handleSearch}>
                                Cerca
                            </button>

                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={toggleTheme}
                                aria-label="Cambia tema"
                            >
                                {theme === "light" ? "🌙" : "☀️"}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;