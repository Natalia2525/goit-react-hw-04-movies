import { NavLink } from 'react-router-dom';
import st from './AppBar.module.css';

const AppBar = () => {
    return (
        <nav className={st.nav}>
            <NavLink
                exact
                to="/"
                className={st.link}
                activeClassName={st.activeLink}
            >
                Home
            </NavLink>
            <NavLink
                to="/movies"
                className={st.link}
                activeClassName={st.activeLink}
            >
                Movies
            </NavLink>
        </nav>
    );
};

export default AppBar;
