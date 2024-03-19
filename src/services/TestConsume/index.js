import {get} from '..';

const getMoviesFromApi = param => {
    return get('/movies.json', param);
};

export {getMoviesFromApi};
