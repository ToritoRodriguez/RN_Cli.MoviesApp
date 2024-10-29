import { StackScreenProps } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { RootStackParamsList } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { ScrollView } from 'react-native-gesture-handler';
import { MovieHeaderScreen } from '../../components/movie/MovieHeaderScreen';
import { MovieDetailsScreen } from '../../components/movie/MovieDetailsScreen';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParamsList, 'Details'>{};


export const DetailsScreen = ({ route }: Props) => {

    const { movieId } = route.params;
    const { isLoading, movie, cast = [] } = useMovie( movieId );

    if (isLoading) {
        return <FullScreenLoader />
    }

    return (
        <ScrollView>
        
        {/* Header */}
        <MovieHeaderScreen 
            originalTitle={ movie!.originalTitle} 
            title={ movie!.title}
            poster={ movie!.poster }
        />


        {/* Details */}
        <MovieDetailsScreen movie={ movie! } cast={cast} />

        </ScrollView>
    )
}