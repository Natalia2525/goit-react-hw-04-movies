import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppBar from './Components/AppBar/AppBar';
import Spinner from './Components/Spinner';

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
            <Suspense fallback={<Spinner/>}>
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
