import axios, { AxiosInstance } from "axios";
import { HttpAdapter } from "./http.adapter";

interface Option {
    baseURL: string;
    params?: Record<string, string>;
}


export class AxiosAdapter implements HttpAdapter {

    private axiosInstance: AxiosInstance;

    constructor( options: Option) {
        this.axiosInstance = axios.create({
            baseURL: options.baseURL,
            params: options.params
        })
    }
    
    async get<T>(url: string, option?: Record<string, unknown>): Promise<T> {
        try {

            const { data } = await this.axiosInstance.get(url, option);

            return data;

        }
        catch (error) {
            throw new Error('Error fetching get' + url);
        }
    }

}