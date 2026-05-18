import { useState } from "react";

function SearchMovie() {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);

    function handleSearch() {
        const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&language=it-IT`;
        
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        fetch(url, options)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                
            });

    }

    return (
        <div>
            <input type="text"
                placeholder="Cerca un film"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            />

            <button onClick={handleSearch}>
                Cerca
            </button>
        </div>
    );
}

export default SearchMovie;