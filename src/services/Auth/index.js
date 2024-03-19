import {patch, postFormData} from '..';

const register = param => {
    return postFormData('/api/register', param);
};

const otpAuth = (phone, param) => {
    return postFormData(`/api/otp/${phone}/verify`, param);
};

const login = param => {
    return postFormData('/api/login', param);
};

export {register, otpAuth, login};
