import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from '../../Service/ApiMovies';
import notFound from '../../images/notFound.jpg';
import st from './Cast.module.css';
const srcUrl = 'https://image.tmdb.org/t/p/w500';
const Cast = () => {
    const [cast, setCast] = useState();
    const { movieId } = useParams();
    useEffect(() => {
        if (movieId && fetchCast(movieId).then(setCast));
    }, [movieId]);

    return (
        <>
            {cast && (
                <ul className={st.list}>
                    {cast.map(({ cast_id, profile_path, name, character }) => (
                        <li className={st.castCard} key={cast_id}>
                            <img
                                className={st.img}
                                src={
                                    profile_path
                                        ? `${srcUrl}/${profile_path}`
                                        : notFound
                                }
                                alt={name}
                            />

                            <h3 className={st.name}>{name}</h3>
                            <span className={st.character}>
                                Charachter: {character}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default Cast;
