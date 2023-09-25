import { ScrollView, TouchableWithoutFeedback, View, Text, Dimensions, Image } from "react-native";
import { getImg } from "../../api";
import { Cast } from "../../interfaces/All";

const {width, height} = Dimensions.get('window');

export default function CastSlider(props: CastSliderProps) {
    return(
        <>
            <View className="mt-8 mb-5 ml-4">
                <Text className="text-2xl text-white">
                    Casts
                </Text>
            </View>

            { props.cast && <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{paddingHorizontal: 12}}
            >
                <View className="flex flex-row">
                    {
                        props.cast?.map((item : any, index: number) => {
                            return(
                                <TouchableWithoutFeedback 
                                    className="relative flex-1 m-10" 
                                    key={index}
                                    onPress={() => 
                                        props.navigation.navigate('Cast', {id: item.id})
                                    }
                                >

                                    <Image
                                        className="m-2 rounded-3xl"
                                        source={{uri: getImg(item.profile_path)}}
                                        style={{width: width/3, height: height/4}}
                                    />

                                    
                                </TouchableWithoutFeedback>
                            );
                        })
                    }
                </View>
                
            </ScrollView>}
        
        </>
    );
}

interface CastSliderProps {
    cast: Cast[];
    navigation: any;
}
  
