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

            {movies.map((movie)=> (
                <div key={movie.id}>
                    {movie.poster_path && (
                        <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                        alt={movie.title} 
                        />
                    )}
                    <h3>{movie.title}</h3>
                    <p>{movie.original_title}</p>
                    <p>{movie.original_language}</p>
                    <p>{movie.vote_average}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchMovie;