import { View, Text, TouchableWithoutFeedback, ScrollView, Image, Dimensions } from "react-native";
import { getImg } from "../../api";

const {width, height} = Dimensions.get('window');

export default function WorksSlider(props: WorksSliderProps) {

  
    return(
        <>
            <View className="mt-8 mb-5 ml-4">
                <Text className="text-2xl text-white">
                    Starred In
                </Text>
            </View>

            { props.workedIn && <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                className="flex-1"
                contentContainerStyle={{paddingHorizontal: 12}}
            >
                <View className="flex flex-row">
                    {
                        props.workedIn?.cast?.map((item : any, index: number) => {
                            return(
                                <TouchableWithoutFeedback 
                                    className="relative flex-1 m-10" 
                                    key={index}
                                    onPress={() => 
                                        props.navigation.navigate('Movie', {id: item.id})
                                    }
                                >

                                    <Image
                                        className="m-2 rounded-3xl"
                                        source={{uri: getImg(item.poster_path)}}
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

interface WorksSliderProps {
    workedIn: Works;
    navigation: any;
}


