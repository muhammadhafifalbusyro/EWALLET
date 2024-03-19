import {get} from '..';

const getProfile = param => {
    return get('/api/users', param);
};


export {getProfile};
