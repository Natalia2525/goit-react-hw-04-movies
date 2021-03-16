import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBar from './Components/AppBar/AppBar';

const HomePage = lazy(() =>
    import('./Components/HomePage' /* webpackChunkName: "HomePage" */),
);

const MoviesPage = lazy(() =>
    import('./Components/MoviesPage' /* webpackChunkName: "MoviesPage" */),
);

const MovieDetailsPage = lazy(() =>
    import(
        './Components/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */
    ),
);
const App = () => {
    return (
        <>
            <AppBar />
            <Suspense fallback={<h1>Загружаем...</h1>}>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                    <Route
                        path="/movies/:movieId"
                        component={MovieDetailsPage}
                    />
                    <Route path="/movies" component={MoviesPage} />
                    <Redirect to="/" />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
