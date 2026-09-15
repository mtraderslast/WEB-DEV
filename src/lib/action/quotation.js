import axios from "axios";
import { apiHandler } from "./apiHandler";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/quotation`;

export const sendQuotationEmail = (formData) => {
    return apiHandler(() =>
        axios.post(`${API_URL}`, formData, { withCredentials: true })
    );
};