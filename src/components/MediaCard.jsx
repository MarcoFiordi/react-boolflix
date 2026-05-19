function MediaCard({ title, originalTitle, language, vote, overview, posterPath, getPoster, getFlag, getStar }) {
    return (
        <div className="media-card">
            {posterPath && (
                <img
                    className="poster-img"
                    src={getPoster(posterPath)}
                    alt={title}
                />
            )}

            <div className="media-info">
                <h3>{title}</h3>
                <p>Titolo originale: {originalTitle}</p>
                <p>Lingua: {getFlag(language)}</p>
                <p>Voto: {getStar(vote)}</p>
                <p>Overview: {overview}</p>
            </div>
        </div>
    );
}

export default MediaCard;