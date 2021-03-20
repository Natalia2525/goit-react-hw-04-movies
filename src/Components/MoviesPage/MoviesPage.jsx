import { useState, useEffect } from 'react';
import { fetchFindFilms } from '../../Service/ApiMovies';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import st from '../MoviesPage/MoviesPage.module.css';
const srcUrl = 'https://image.tmdb.org/t/p/w500';
const MoviesPage = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [findFilms, setfindFilms] = useState([]);
    const [request, SetRequest] = useState('');
    const location = useLocation();

    const { url } = useRouteMatch();

    useEffect(() => {
        if (request !== '') {
            fetchFindFilms(request).then(setfindFilms);
        }
    }, [request]);

    const handleChange = e => {
        setsearchQuery(e.currentTarget.value.toLowerCase());
    };
    const handleSubmit = e => {
        e.preventDefault();
        SetRequest(searchQuery);
    };

    return (
        <>
            <h1 className={st.title_head}>MoviesPage</h1>
            <div className={st.searchBar}>
                <form className={st.searchForm} onSubmit={handleSubmit}>
                    <input
                        className={st.input}
                        type="text"
                        value={searchQuery}
                        placeholder="Search movies"
                        onChange={handleChange}
                    />
                    <button className={st.button} type="submit"></button>
                </form>
            </div>

            {findFilms && (
                <>
                    <ul className={st.list}>
                        {findFilms.map(({ poster_path, title, id, name }) => (
                            <li key={id} className={st.item}>
                                <Link
                                    className={st.link}
                                    to={{
                                        pathname: `${url}/${id}`,
                                        state: {
                                            from: location.pathname,
                                        },
                                    }}
                                >
                                    <img
                                        src={`${srcUrl}/${poster_path}`}
                                        alt={title}
                                    />
                                    <h3 className={st.title}>
                                        {title || name}
                                    </h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
};

export default MoviesPage;
