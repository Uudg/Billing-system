import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const get_client = async (id: string) => {
    try {
        const response = await axios.get(`${url}/clients/${id}`);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const get_table = async (id: string) => {
    try {
        const response = await axios.get(`${url}/tables/${id}`);
        return response.data;
    } catch (err) {
        console.log(err)
    }
}

export const get_client_tables = async (id: string) => {
    const response = await axios.get(`${url}/clients/${id}/tables`);
    return response.data;
}

export const generate_invoice = async (id: string) => {
    const response = await axios.get(`${url}/tables/${id}/invoice`);
    return response.data;
}