import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../Service/ApiMovies';

const srcUrl = 'https://image.tmdb.org/t/p/w500';
const Cast = () => {
    const [cast, setCast] = useState();
    const { movieId } = useParams();
    useEffect(() => {
        fetchCast(movieId).then(setCast);
    }, [movieId]);

    return (
        <>
            {cast && (
                <ul>
                    {cast.map(({ cast_id, profile_path, name, character }) => (
                        <li key={cast_id}>
                            <img src={`${srcUrl}${profile_path}`} alt="" />
                            <h3>{name}</h3>
                            <span>Charachter: {character}</span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Cast;
