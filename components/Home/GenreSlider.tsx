import { View, Text, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from "react-native";
import { getImg } from "../../api";
import { useNavigation } from "@react-navigation/native";

interface GenreSliderProps {
    title: string;
    data: any;
}

const {width, height} = Dimensions.get('window');

export function GenreSlider(props : GenreSliderProps){
    
    const navigator = useNavigation();

    function navMovie(id: number){
        navigator.navigate('Movie', {id: id});
    }

    return(
        <>
            <View className="mt-8 mb-5 ml-4">
                <Text className="text-2xl text-white">
                    {props.title}
                </Text>
            </View>

            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{paddingHorizontal: 12}}
            >
                <View className="flex flex-row">
                    {
                        props.data.map((item : any, index: number) => {
                            return(
                                <TouchableWithoutFeedback 
                                    className="relative flex-1 m-10" 
                                    key={index}
                                    onPress={() => navMovie(item.id)}
                                >

                                    <Image
                                        className="m-2 rounded-xl"
                                        source={{uri: getImg(item.poster_path)}}
                                        style={{width: width/3, height: height/4}}
                                    />

                                    
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </View>
                
            </ScrollView>
        
        </>
    );
    
}