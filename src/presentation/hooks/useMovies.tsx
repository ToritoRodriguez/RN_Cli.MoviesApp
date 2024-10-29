import {useEffect, useState} from 'react';
import type {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;
let topRatedPageNumber = 1;
let upComingPageNumber = 1;

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);

    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);

    useEffect(() => {
        initialLoad();
    }, []);

    const initialLoad = async () => {

        const nowPlayingPromise = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
        const popularPromise = UseCases.moviesPopularUseCase(movieDBFetcher, { page: popularPageNumber });
        const topRatedPromise = UseCases.moviesTopRatedUseCase(movieDBFetcher, { page: topRatedPageNumber });
        const upcomingPromise = UseCases.moviesUpcomingUseCase(movieDBFetcher, { page: upComingPageNumber });

        const [
            nowPlayingMovies,
            popularMovies,
            topRatedMovies,
            upcomingMovies,
        ] = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise,
        ]);

        setNowPlaying( nowPlayingMovies );
        setPopular( popularMovies );
        setTopRated( topRatedMovies );
        setUpcoming( upcomingMovies );

        setIsLoading(false);

        // console.log('nowPlayingMovies', nowPlayingMovies);
        // console.log('popularMovies', popularMovies);
        // console.log('topRatedMovies', topRatedMovies);
        // console.log('upcomingMovies', upcomingMovies);

    };

    return {
        isLoading,
        nowPlaying,
        popular,
        topRated,
        upcoming,

        //Metodos
        popularNextPage: async () => {
            popularPageNumber++;
            const newPopularMovies = await UseCases.moviesPopularUseCase(movieDBFetcher, {
                page: popularPageNumber
            });
            setPopular( popular => [...popular, ...newPopularMovies] );
        },

        topRatedNextPage: async () => {
            topRatedPageNumber++;
            const newtopRatedMovies = await UseCases.moviesTopRatedUseCase(movieDBFetcher, {
                page: topRatedPageNumber
            });
            setTopRated( topRated => [...topRated, ...newtopRatedMovies] );
        },     

        upComingNextPage: async () => {
            upComingPageNumber++;
            const newupComingMovies = await UseCases.moviesUpcomingUseCase(movieDBFetcher, {
                page: upComingPageNumber
            });
            setUpcoming( upComing => [...upComing, ...newupComingMovies] );
        }   
    };
};