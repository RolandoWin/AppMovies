import { HttpAdapter } from "../../../config/adapters/http/http.adapter";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";

export const getMovieByIdUsecase = async (
    fectcher: HttpAdapter,
    movieId: number,
): Promise<FullMovie> => {
    
    try {
        
        // fetcher
        const movie = await fectcher.get<MovieDBMovie>(`/${ movieId }`);
        // mapeo
        const fullMovie = MovieMapper.formMovieDBToEntity( movie )
        
        return fullMovie;

    } catch (error) {
        throw new Error(`Cannot get movie by id: ${ movieId}`);
        
    }
}