import axios from "axios";

// .env 파일에 VITE_API_BASE_URL이 설정되어 있어야 합니다.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 1. 목록 조회 (GET /{type})
export const getItems = async (type = "clothes", params = {}) => {
    const res = await api.get(`/${type}`, { params });
    return res.data;
};

// 2. 새 상품 등록 (POST /{type})
export const addItem = async (type, data) => {
    const res = await api.post(`/${type}`, data);
    return res.data;
};

// 3. 특정 상품 조회 (GET /{type}/{id})
export const getItemDetail = async (type, id) => {
    const res = await api.get(`/${type}/${id}`);
    return res.data;
};

// 4. 상품 수정 (PUT /{type}/{id})
export const updateItem = async (type, id, data) => {
    const res = await api.put(`/${type}/${id}`, data);
    return res.data;
};

// 5. 상품 삭제 (DELETE /{type}/{id})
export const deleteItem = async (type, id) => {
    const res = await api.delete(`/${type}/${id}`);
    return res.data;
};