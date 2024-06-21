import { useEffect, useState } from 'react';
import { Movie } from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upComing, setUpComing] = useState<Movie[]>([]);

    useEffect(() => {
      
        initialLoad();

    }, [])

    const initialLoad = async() => {

        const nowPlayingPromise =  UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise =  UseCases.moviesPopularUseCase(movieDBFetcher);
        const top_RatedPromise =  UseCases.moviesTop_RatedUseCase(movieDBFetcher);
        const upComingPromise =  UseCases.moviesUpComingUseCase(movieDBFetcher);
        
        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upComingMovies,
        ] = await Promise.all([ 
            nowPlayingPromise, 
            popularPromise, 
            top_RatedPromise, 
            upComingPromise
        ]);
               
        setNowPlaying( nowPlayingMovies );
        setPopular( popularMovies );
        setTopRated( topRatedMovies );
        setUpComing( upComingMovies );

        setIsLoading( false );

        // console.log(
        //     nowPlayingMovies,
        //     popularMovies,
        //     topRatedMovies,
        //     upComingMovies
        // )
        
    }
    
    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upComing,

        //Methods
        popularNextPage: async() => {
            popularPageNumber++;
            const popularMovies = await UseCases.moviesPopularUseCase( movieDBFetcher, {
                page: popularPageNumber,
            });

            setPopular( prev => [...prev, ...popularMovies ] );
        }
    }

}
