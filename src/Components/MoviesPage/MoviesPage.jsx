import { useState, useEffect } from 'react';
import { fetchFindFilms } from '../../Service/ApiMovies';
import { Link, useRouteMatch } from 'react-router-dom';

const MoviesPage = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [findFilms, setfindFilms] = useState([]);
    const [request, SetRequest] = useState('');

    const { url } = useRouteMatch();

    const handleChange = e => {
        setsearchQuery(e.currentTarget.value.toLowerCase());
    };
    const handleSubmit = e => {
        e.preventDefault();
        SetRequest(searchQuery);
        setsearchQuery('');
        setfindFilms([]);
    };

    useEffect(() => {
        fetchFindFilms(request).then(setfindFilms);
    }, [request]);

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
            <ul>
                {findFilms.map(({ title, id, name }) => (
                    <li key={id}>
                        <Link to={`${url}/${id}`}>{title || name}</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default MoviesPage;
