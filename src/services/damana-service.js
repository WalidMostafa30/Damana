import api from "./api";

export const checkByRegN = async (registration_number) => {
    const response = await api.get('api/v2/dvld/checkByRegN?registration_number='+registration_number);
    return response.data;
};

export const getCommission = async (data) => {
    const response = await api.post('api/v2/vehicle-transfers/get-commission',data);
    return response.data;
};
export const CheckCoupon = async (data) => {
    const response = await api.post('api/v2/check-coupon',data);
    return response.data;
};

export const GetUserInfo = async (national_number) => {
    const response = await api.get('api/v2/get-user-info?national_number='+national_number);
    return response.data;
};

export const damanaShow = async (damanaId) => {
    const response = await api.get('api/v2/vehicle-transfers/show?id='+damanaId);
    return response.data;
};


export const changeStatus = async (data) => {
    const response = await api.post('api/v2/vehicle-transfers/update_status' , data);
    return response.data;
};
export const releaseRequest = async (data) => {
    const response = await api.post('api/v2/vehicle-transfers/release_request' , data);
    return response.data;
};





export const SubmitDamana = async (data) => {
    const response = await api.post('api/v2/vehicle-transfers/create',data);
    return response.data;
};


export const fetchDamanat = async (params = {}) => {
    const response = await    api.get('api/v2/vehicle-transfers/list', { params });
    return response.data;

};

