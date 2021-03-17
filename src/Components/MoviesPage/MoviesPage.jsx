import { useState, useEffect } from 'react';
import { fetchFindFilms } from '../../Service/ApiMovies';
const MoviesPage = () => {
    const [searchQuery, setsearchQuery] = useState('');
    const [findFilms, setfindFilms] = useState([]);
    const [request, SetRequest] = useState('');

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
        fetchFindFilms(request).then(results => setfindFilms(results));
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
            {findFilms.map(({ title, id, name }) => (
                <li key={id}>
                    <h3>{title || name}</h3>
                </li>
            ))}
        </>
    );
};

export default MoviesPage;
