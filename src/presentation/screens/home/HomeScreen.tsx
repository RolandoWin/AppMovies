import { ScrollView, Text, View } from 'react-native';
import { useMovies } from '../../hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PosterCarousel } from '../../components/PosterCarousel';
import { HorizontalCarousel } from '../../components/HorizontalCarousel';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();

  const { isLoading, nowPlaying, popular, topRated, upComing, popularNextPage } = useMovies();

  if( isLoading ) {
    return( <FullScreenLoader /> )
  }

  return (    
    <ScrollView>
      <View style={ {marginTop: top + 20, paddingBottom: 30} }>
        
        {/* Principal */}
        <PosterCarousel movies={nowPlaying} height={440} />

        {/* Populares */}
        <HorizontalCarousel 
          movies={popular} 
          title="Populares" 
          loadNextPage={ () => popularNextPage() }
        />

        {/* Top rated */}
        <HorizontalCarousel movies={topRated} title="Mejor calificadas" />

        {/* Próximamente */}
        <HorizontalCarousel movies={upComing} title="Próximamente" />

      </View>
    </ScrollView>      
  )
}
