import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import st from './HomePage.module.css';
import { fetchTrendingFilms } from '../../Service/ApiMovies';

const srcUrl = 'https://image.tmdb.org/t/p/w500';
const HomePage = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchTrendingFilms().then(setFilms);
    }, []);

    return (
        <>
            <h1>Tranding Films</h1>
            <ul className={st.list}>
                {films.map(({ poster_path, title, id, name }) => (
                    <li key={id} className={st.item}>
                        <Link to={`/movies/${id}`}>
                            <img src={`${srcUrl}${poster_path}`} alt={title} />
                            <h3 className={st.title}>{title || name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HomePage;
