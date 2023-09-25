import { TouchableWithoutFeedback , Image, Dimensions } from 'react-native'
import {getImg} from '../../api'
import { useNavigation } from '@react-navigation/native';


var {width, height} = Dimensions.get('window');

export function CarouselItem (props: any){
    
    const navigator = useNavigation();
    function navMovie(id: number){
        navigator.navigate('Movie', {id: id});
    }

    

    return (
        <TouchableWithoutFeedback onPress={()=> navMovie(props.item.id)}>
            <Image 
                // source={require('../assets/images/moviePoster1.png')} 
                source={{uri: getImg(props.item.poster_path, 500)}} 
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl" 
            />
        </TouchableWithoutFeedback>
    )
}