import { useState } from "react";
import Header from "../components/Header";
import MediaCard from "../components/MediaCard";


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
        <div className="search-page">
            <Header
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearch={handleSearch}
            />

            {movies.length > 0 && (
                <section className="my-5">
                    <h2 className="px-4 mb-3">Film</h2>

                    <div className="container-fluid px-4">
                        <div className="row gy-5 gx-3">
                            {movies.map((movie) => (
                                <div
                                    className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4"
                                    key={movie.id}
                                >
                                    <MediaCard
                                        title={movie.title}
                                        originalTitle={movie.original_title}
                                        language={movie.original_language}
                                        vote={movie.vote_average}
                                        overview={movie.overview}
                                        posterPath={movie.poster_path}
                                        getPoster={getPoster}
                                        getFlag={getFlag}
                                        getStar={getStar}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {tvSeries.length > 0 && (
                <section className="my-5">
                    <h2 className="px-4 mb-3">Serie TV</h2>

                    <div className="container-fluid px-4">
                        <div className="row gy-5 gx-3">
                            {tvSeries.map((serie) => (
                                <div
                                    className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4"
                                    key={serie.id}
                                >
                                    <MediaCard
                                        title={serie.name}
                                        originalTitle={serie.original_name}
                                        language={serie.original_language}
                                        vote={serie.vote_average}
                                        overview={serie.overview}
                                        posterPath={serie.poster_path}
                                        getPoster={getPoster}
                                        getFlag={getFlag}
                                        getStar={getStar}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export default SearchMovie;