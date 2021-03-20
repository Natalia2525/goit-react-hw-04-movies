import { useState, useEffect } from 'react';
import { fetchFindFilms } from '../../Service/ApiMovies';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import st from '../HomePage/HomePage.module.css';
const srcUrl = 'https://image.tmdb.org/t/p/w500';
const MoviesPage = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [findFilms, setfindFilms] = useState([]);
    const [request, SetRequest] = useState('');
    const location = useLocation();
    const history = useHistory();

    const { url } = useRouteMatch();

    useEffect(() => {
        fetchFindFilms(request).then(setfindFilms);
    }, [request]);

    const handleChange = e => {
        setsearchQuery(e.currentTarget.value.toLowerCase());
    };
    const handleSubmit = e => {
        e.preventDefault();
        SetRequest(searchQuery);
        // history.push({
        //     pathname: location.pathname,
        //     search: searchQuery,
        // });
    };

    return (
        <>
            <h1>MoviesPage</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search movies"
                    onChange={handleChange}
                />
                <button type="submit">
                    <span>Search</span>
                </button>
            </form>
            {findFilms && (
                <>
                    <ul className={st.list}>
                        {findFilms.map(({ poster_path, title, id, name }) => (
                            <li key={id} className={st.item}>
                                <Link
                                    to={{
                                        pathname: `${url}/${id}`,
                                        state: {
                                            from: location.pathname,
                                        },
                                    }}
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                                        alt={title}
                                    />
                                    <h3 className={st.title}>
                                        {title || name}
                                    </h3>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* <ul>
                        {findFilms.map(({ title, id, name }) => (
                            <Link
                                to={{
                                    pathname: `${url}/${id}`,
                                    state: {
                                        from: location.pathname,
                                    },
                                }}
                            >
                                <li key={id}>{title || name}</li>
                            </Link>
                        ))}
                    </ul> */}
                </>
            )}
        </>
    );
};

export default MoviesPage;
