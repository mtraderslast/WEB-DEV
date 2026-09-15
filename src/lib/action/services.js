import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`;

export const fetchServices = (params = {}) => {
    return apiHandler(() => axios.get(API_URL, { params }));
};

export const fetchServiceBySlug = (slug) => {
    return apiHandler(() => axios.get(`${API_URL}/${slug}`));
};