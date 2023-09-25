import {  SearchResult } from "../../interfaces/All";
import { getImg } from "../../api";
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from "react-native";

const {width, height} = Dimensions.get('window');

export default function SearchCard(props: SearchCardProps){
    return(
        <View className="">
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Movie', {id: props.movieDetails.id})}>
                <View className="flex flex-row m-2" >
                    <Image
                        className="rounded-3xl"
                        source={{uri: getImg(props.movieDetails.poster_path)}}
                        style={{width: width/3, height: height/6}}
                    />
                
                    <View className="flex flex-col justify-center w-full ml-2 mr-2 space-y-2">
                        <View>
                            <Text className="text-xl text-white " style={{ flexShrink: 1 }}>{props.movieDetails.title}</Text>
                        </View>
                        
                        <Text className="text-white ">{props.movieDetails.release_date.slice(0,4)}</Text>
                        {/* <Text className="text-white ">{props.movieDetails.overview.slice(0,150)} .............</Text> */}
                    </View>
                </View>
                
            </TouchableWithoutFeedback>
            
            
        </View>
    );
}

interface SearchCardProps{
    movieDetails: SearchResult;
    navigation: any;
}