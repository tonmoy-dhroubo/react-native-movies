import { View, Text, TouchableWithoutFeedback , Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel'
import { getImg } from '../api';
import { CarouselItem } from './TrendingCarouselItem';

var {width, height} = Dimensions.get('window');

export function TrendingCarousel({data} : any){
    return (
        <View className='flex items-center justify-center flex-1 mt-8'>
            <Text className="mb-6 text-xl text-white"> Trending </Text>
            <Carousel
                layout={'default'}
                data = {data}
                firstItem={1}
                renderItem={({item}) => {
                    return(
                        <CarouselItem item={item} handleClick={() => null} />
                    );
                }}
                sliderWidth={width}
                itemWidth={width * .60}
            />
        </View>
    );
}

