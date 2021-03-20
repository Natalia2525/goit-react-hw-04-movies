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
import st from './MovieDetailsPage.module.css';
import Spinner from '../Spinner';

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
        <div className={st.card}>
            <button className={st.btn} onClick={handleClickBack}>
                <span>Go Back</span>
            </button>
            {film && (
                <>
                    <img
                        src={
                            film.poster_path
                                ? `${srcUrl}/${film.poster_path}`
                                : notFound
                        }
                        alt={film.title}
                    />
                    <div className={st.description}>
                        <h2 className={st.title}>{film.title}</h2>
                        <p className={st.score}>
                            User Score: {film.popularity}
                        </p>
                        <h3 className={st.subTittle}>Overview</h3>
                        <span className={st.overview}>{film.overview}</span>
                        <h3 className={st.subTittle}>Genres</h3>
                        <ul className={st.genresList}>
                            {film.genres.map(genre => (
                                <li className={st.genre} key={genre.id}>
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2 className={st.title}>Additional information</h2>
                    <ul className={st.list}>
                        <li>
                            <NavLink
                                className={st.link}
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
                                className={st.link}
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
                    <Suspense fallback={<Spinner />}>
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
        </div>
    );
};

export default MovieDetailsPage;
