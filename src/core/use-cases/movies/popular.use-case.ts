import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import type { Movie } from '../../entities/movie.entity';

interface Options {
    page?: number;
    limit?: number;
}

export const moviesPopularUseCase = async ( fetcher: HttpAdapter, options?: Options ):Promise<Movie[]> => {

    try {
        
        console.log({ page: options?.page ?? 1 });

        const popular = await fetcher.get<MovieDBMoviesResponse>('/popular', {
            params: {
                page: options?.page ?? 1
            }
        });

        // console.log({ popular });

        return popular.results.map( result => MovieMapper.fromMovieDBResultToEntity(result));

        // también es valido
        // return nowPlaying.results.map( MovieMapper.fromMovieDBResultToEntity );        

    } catch (error){
        // console.log(error);
        throw new Error('Error fetching movies - Popular');
    }

}