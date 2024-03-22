import {get} from '..';

const getAllActivity = param => {
    return get('/api/activity', param);
};


export {getAllActivity};
