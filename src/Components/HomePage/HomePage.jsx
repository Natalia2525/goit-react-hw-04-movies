import { useState, useEffect } from 'react';
import st from './HomePage.module.css';
import fetchTrendingFilms from '../../Service/ApiMovies';

const srcUrl = 'https://image.tmdb.org/t/p/w500';
const HomePage = () => {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetchTrendingFilms().then(results => setFilms(results));
    }, []);

    return (
        <>
            <h1>Tranding Films</h1>
            <ul className={st.list}>
                {films.map(({ poster_path, title, id, name }) => (
                    <li key={id} className={st.item}>
                        <img src={`${srcUrl}${poster_path}`} alt={title} />
                        <h3 className={st.title}>{title || name}</h3>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default HomePage;
