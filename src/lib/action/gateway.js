import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/gateways`;

export const fetchGateways = () => {
    return apiHandler(() =>
        axios.get(`${API_URL}`, { withCredentials: true })
    );
};

export const createGateway = (data) => {
    return apiHandler(() =>
        axios.post(`${API_URL}`, data, { withCredentials: true })
    );
};

export const updateGateway = (id, data) => {
    return apiHandler(() =>
        axios.patch(`${API_URL}/${id}`, data, { withCredentials: true })
    );
};