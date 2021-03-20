import { useState, useEffect } from 'react';
import { Suspense, lazy } from 'react';
import {
    Route,
    useParams,
    NavLink,
    useRouteMatch,
    useHistory,
    useLocation,
    Switch,
} from 'react-router-dom';
import { fetchCardFilm } from '../../Service/ApiMovies';
import notFound from '../../images/notFound.jpg';

const Cast = lazy(() => import('../Cast/Cast' /* webpackChunkName: "Cast" */));

const Reviews = lazy(() =>
    import('../Reviews/Reviews' /* webpackChunkName: "Reviews" */),
);

const srcUrl = 'https://image.tmdb.org/t/p/w500';
const MovieDetailsPage = () => {
    const [film, setFilm] = useState(null);
    const { movieId } = useParams();
    const { url, path } = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        fetchCardFilm(movieId).then(setFilm);
    }, [movieId]);

    const handleClickBack = () => {
        return history.push(location?.state?.from || '/');
    };
    return (
        <>
            <button onClick={handleClickBack}>
                <span>Go Back</span>
            </button>
            {film && (
                <>
                    <img
                        src={
                            film.poster_path
                                ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
                                : notFound
                        }
                        alt={film.title}
                    />
                    <h3>{film.title}</h3>
                    <h2>Overview</h2>
                    <span>{film.overview}</span>
                    <h2>Additional information</h2>
                    <ul>
                        <li>
                            <NavLink
                                to={{
                                    pathname: `${url}/cast`,
                                    state: { ...location.state },
                                }}
                            >
                                Cast
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={{
                                    pathname: `${url}/reviews`,
                                    state: { ...location.state },
                                }}
                            >
                                Reviews
                            </NavLink>
                        </li>
                    </ul>
                    <hr />
                    <Suspense fallback={<h1>Загружаем...</h1>}>
                        <Switch>
                            <Route
                                exact
                                path={`${path}/cast`}
                                component={Cast}
                            ></Route>
                            <Route
                                exact
                                path={`${path}/reviews`}
                                component={Reviews}
                            ></Route>
                        </Switch>
                    </Suspense>
                </>
            )}
        </>
    );
};

export default MovieDetailsPage;
