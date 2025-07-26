// authService.js
import api  from './api'; // استخدم instance الخاص بـ Axios الذي قمت بإعداده

export const login = async (credentials) => {
    // تأكد من أن نقطة النهاية (endpoint) تتوافق مع الخادم لديك
    const response = await api.post('web/auth/login', credentials);
    return response.data;
};





export const changePassword = async (credentials) => {
    const response = await api.post('api/v2/auth/change-password', credentials);
    return response.data;
};




export const checkForgotPassword = async (data) => {
    const response = await api.post('api/v2/auth/forgot-password/check', data);
    return response.data;
};





export const checkFPOtp = async (data) => {
    const response = await api.post('api/v2/auth/forgot-password/check-otp', data);
    return response.data;
};

export const resetFPPassword = async (data) => {
    const response = await api.post('api/v2/auth/forgot-password/reset-password', data);
    return response.data;
};



export const checkUser = async () => {

    const response = await api.get("api/v2/auth/me");
    return response.data;
};




export const sendOtp = async () => {

    const response = await api.post('api/v2/auth/verified-mobile/sendOtp');
    console.log('checkOtpWithVerified response' , response.data )
    return response.data;
};

export const checkOtpWithVerified = async (otp ) => {
    const response = await api.post('api/v2/auth/verified-mobile/checkOtpWithVerified'   , {
        otp_code: otp
    });
    console.log('sendOtp response' , response.data )
    return response.data;
};


export const logout = async () => {
    const response = await api.post('web/auth/logout');
    return response.data;
};


export const getCsrfCookie = async () => {
    await api.get('sanctum/csrf-cookie' );
};



export const updateBankingInfo = async (data) => {
    const response = await api.post('api/v2/auth/updateBankingInfo', data);
    return response.data;
};



export const updateAddressInfo = async (data) => {
    const response = await api.post('api/v2/auth/updateAddressInfo', data);
    return response.data;
};

