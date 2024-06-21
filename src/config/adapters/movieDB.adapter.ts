
import { THE_MOVIE_DB_kEY } from '@env';
import { AxiosAdapter } from './http/axios.adapter';



export const movieDBFetcher = new AxiosAdapter({
    baseUrl: 'https://api.themoviedb.org/3/movie',
    params: {
        //api_key: 'd92832ffbb9b5e29fe38d5bf93739966',
        api_key: THE_MOVIE_DB_kEY ?? 'no-key',
        language: 'es',
    }
})