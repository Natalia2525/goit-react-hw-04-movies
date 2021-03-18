import { useState, useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { Route, useParams, NavLink, useRouteMatch } from 'react-router-dom';
import { fetchCardFilm } from '../../Service/ApiMovies';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "Cast" */));

const Reviews = lazy(() =>
    import('../Reviews/Reviews' /* webpackChunkName: "Reviews" */),
);

const srcUrl = 'https://image.tmdb.org/t/p/w500';
const MovieDetailsPage = () => {
    const [film, setFilm] = useState(null);
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();

    useEffect(() => {
        fetchCardFilm(movieId).then(setFilm);
    }, [movieId]);

    return (
        <>
            <button>
                <span>Go Back</span>
            </button>
            {film && (
                <>
                    <img
                        src={`${srcUrl}${film.poster_path}`}
                        alt={film.title}
                    />
                    <h3>{film.title}</h3>
                    <h2>Overview</h2>
                    <span>{film.overview}</span>
                    <h2>Additional information</h2>
                    <ul>
                        <li>
                            <NavLink to={`${url}/cast`}>Cast</NavLink>
                        </li>
                        <li>
                            <NavLink to={`${url}/reviews`}>Reviews</NavLink>
                        </li>
                    </ul>
                    <hr />
                    <Suspense fallback={<h1>Загружаем...</h1>}>
                        <Route
                            path="/movies/:movieId/cast"
                            component={Cast}
                        ></Route>
                        <Route
                            path="/movies/:movieId/reviews"
                            component={Reviews}
                        ></Route>
                    </Suspense>
                </>
            )}
        </>
    );
};

export default MovieDetailsPage;
