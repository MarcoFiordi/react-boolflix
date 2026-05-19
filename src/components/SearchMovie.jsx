import { useState } from "react";

function SearchMovie() {
    const [searchText, setSearchText] = useState("");
    const [movies, setMovies] = useState([]);
    const [tvSeries, setTvSeries] = useState([]);

    function getFlag(language) {
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

        if (!countryCode) {
            return language;
        }

        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={language}
            />
        );
    }

    function getPoster(path) {
        if (!path) {
            return null
        }
        return `https://image.tmdb.org/t/p/w342${path}`;
    }

    function getStar(vote) {
        const fullStars = Math.ceil(vote / 2);
        const emptyStars = 5 - fullStars;

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
                ))}

                {[...Array(emptyStars)].map((_, index) => (
                    <i key={index} className="fa-regular fa-star"></i>
                ))}
            </>
        );
    }

    function handleSearch() {
        const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchText}&language=it-IT`;
        const tvUrl = `https://api.themoviedb.org/3/search/tv?query=${searchText}&language=it-IT`;

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

        fetch(tvUrl, options)
            .then((response) => response.json())
            .then((data) => {
                setTvSeries(data.results);
            })
            .catch((error) => {
                console.error('errore nella ricerca serie tv', error);
            })
            .finally(() => {
                console.log('ricerca serie tv completata');

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
            <h2>Film</h2>
            {movies.map((movie) => (
                <div key={movie.id}>
                    {movie.poster_path && (
                        <img src={getPoster(movie.poster_path)} alt={movie.title} />
                    )}
                    <h3> {movie.title}</h3>
                    <p>Titolo originale: {movie.original_title}</p>
                    <p>Lingua: {getFlag(movie.original_language)}</p>
                    <p>Voto: {getStar(movie.vote_average)} stelle</p>
                </div>
            ))}

            <h2>Serie TV</h2>
            {tvSeries.map((serie) => (
                <div key={serie.id}>
                    {serie.poster_path && (
                        <img src={getPoster(serie.poster_path)} alt={serie.name} />
                    )}
                    <h3>{serie.name}</h3>
                    <p>Titolo originale: {serie.original_name}</p>
                    <p>Lingua: {getFlag(serie.original_language)}</p>
                    <p>Voto: {getStar(serie.vote_average)} stelle</p>
                </div>
            ))}
        </div>
    );
}

export default SearchMovie;