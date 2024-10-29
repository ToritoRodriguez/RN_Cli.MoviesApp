import { THE_MOVIE_DB_KEY } from "@env";
import { AxiosAdapter } from "./http/axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: THE_MOVIE_DB_KEY ?? 'No-Key',
        language: 'es'
    }
});