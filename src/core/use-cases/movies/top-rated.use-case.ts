import { HttpAdapter } from '../../../config/adapters/http/http.adapter';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import type { Movie } from '../../entities/movie.entity';

export const moviesTop_RatedUseCase = async ( fetcher: HttpAdapter ):Promise<Movie[]> => {

    try {
        
        const top_Rated = await fetcher.get<MovieDBMoviesResponse>('/top_rated');

        // console.log({ top_Rated });

        return top_Rated.results.map( result => MovieMapper.fromMovieDBResultToEntity(result));

        // también es valido
        // return nowPlaying.results.map( MovieMapper.fromMovieDBResultToEntity );        

    } catch (error){
        // console.log(error);
        throw new Error('Error fetching movies - Top_Rated');
    }

}