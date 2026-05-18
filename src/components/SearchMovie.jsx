import { useState } from "react";

function SearchMovie() {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);

    function getFlag(language){
        const flags = {
            en: 'gb',
            it: 'it',
            fr: 'fr',
            es: 'es',
            de: 'de',
            ja: 'jp',
            ko: 'kr',
            zh: 'cn',
        };
        const countryCode = flags[language];

        if (!countryCode){
            return language;
        }
        
        return(
            <img 
            src={`https://flagcdn.com/24x18/${countryCode}.png`} 
            alt={language} 
            />
        );
    }

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
            })
            .catch((error) => {
                console.error('errore nella ricerca:', error);
                
            })
            .finally(() => {
                console.log('ricerca completata');
                
            })
            

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
                    <h3> {movie.title}</h3>
                    <p>Titolo originale: {movie.original_title}</p>
                    <p>Lingua: {getFlag(movie.original_language)}</p>
                    <p>Voto: {movie.vote_average}</p>
                </div>
            ))}
        </div>
    );
}

export default SearchMovie;