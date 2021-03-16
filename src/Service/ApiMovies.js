import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = 'ffddee44025dd24685ea61d637d56d24';

const fetchTrendingFilms = () => {
    return axios
        .get(`trending/all/day?api_key=${API_KEY}`)
        .then(({ data }) => data.results);
};

export default fetchTrendingFilms;