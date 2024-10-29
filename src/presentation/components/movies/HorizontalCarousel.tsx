import { NativeScrollEvent, NativeSyntheticEvent, Text, View } from 'react-native'
import { Movie } from '../../../core/entities/movie.entity';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';
import { useEffect, useRef } from 'react';

interface Props{
    movies: Movie[];
    title: string;
    loadNextPage?: () => void;
}

export const HorizontalCarousel = ({movies, title, loadNextPage}: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {

        setTimeout(() => {
            isLoading.current = false;
        }, 200);
        
    }, [ movies ])
    

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        // Si ya se esta cargando la siguiente pagina, no se hace nada
        if(isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

        // Se verifica si se ha llegado al final del scroll
        const isEndReached = (contentOffset.x + layoutMeasurement.width) >= contentSize.width;

        // Si no se ha llegado al final, no se hace nada
        if(isEndReached) return;

        // Se indica que se esta cargando la siguiente pagina
        isLoading.current = true;

        // Se llama a la funcion que carga la siguiente pagina
        loadNextPage && loadNextPage();

    }

    return (
        <View
            style={{
                height: title ? 260 : 220,
            }}
        >
            {
                title && (
                    <Text 
                        style={{
                            fontSize: 30, 
                            fontWeight: 'bold', 
                            marginLeft: 10,
                            marginBottom: 10
                        }}
                        >
                            {title}
                        </Text>
                )
            }

            <FlatList 
                data={movies}
                renderItem={ ({item}) => (
                    <MoviePoster movies={item} width={140} height={200}/>
                )}
                keyExtractor={ (item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                onScroll={ onScroll }
            />

        </View>
    )
}
