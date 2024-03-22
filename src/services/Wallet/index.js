import {patch, post, postFormData} from '..';

const topup = param => {
    return patch('/api/activity/topup', param);
};
const searchPhone = (phone, param) =>{
    return post(`/api/users/${phone}/search`, param);
}
const sendMoney = param => {
    return postFormData('/api/activity/send', param);
};


export {topup,searchPhone,sendMoney};
