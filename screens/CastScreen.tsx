import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View, Text, Image, Dimensions } from "react-native";
import { getCastProfile, getCastWorks, getImg } from "../api";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import WorksSlider from "../components/Cast/WorksSlider";
import { CastProfile, Works } from "../interfaces/All";

const {width, height} = Dimensions.get('screen');

export default function CastScreen(props: CastScreenProps) {
    const castId = props.route.params?.id;
    const [castProfile, setCastProfile] = useState<CastProfile>({} as CastProfile);
    const [castWorks, setCastWorks] = useState<Works>({} as Works);
    

    useEffect(() => {
            getProfile(castId);
            getWorks(castId);
        }, [castId]
    );

    async function getProfile(id: number) {
        const response = await getCastProfile(id);
        if(response) setCastProfile(response);
    }

    async function getWorks(id: number) {
        const response = await getCastWorks(id);
        if(response.id) setCastWorks(response);
    }
    


    return(
      <>  
          {/* Back Button */}
          <SafeAreaView  className="absolute z-20 flex-1 " >
            <TouchableOpacity 
              className="p-3 mt-3 ml-3 rounded-xl bg-slate-950/70"
              onPress={() => props.navigation.goBack()}
              >
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            
          </SafeAreaView>


          <ScrollView className="bg-slate-950">

          {/* Poster  */}
          <View>
            <Image  
              source={{uri: getImg(castProfile.profile_path, 500)}} 
              style={{width: width, height:height/2  }}  
            />
            <LinearGradient 
              colors={['transparent', 'rgba(0,0,20, 0.5)', 'rgba(0, 0, 20, .95)']} 
              style={{width, height: height*0.60}}
              
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0"
            />

          </View>


          {/* Details */}
          <View className="flex items-center justify-center flex-1 -mt-24">
            {/* Title */}
            <Text className="p-3 text-3xl font-bold text-white">{castProfile?.name}</Text>

            {/* Year and Rating */}
            <View className="flex flex-row items-center justify-center flex-1 mb-2">
              <Text className="mr-2 text-lg text-white">
                {castProfile.birthday?.slice(0,4)}
              </Text>
            </View>

            
            {/* Overview */}
            <Text className="p-3 text-lg text-white">{castProfile?.biography}</Text>
            
          </View>

          {castWorks.cast && <WorksSlider navigation={props.navigation} workedIn={castWorks} />}
          
            
        </ScrollView>

      </>
        
        
    );
}

interface CastScreenProps {
    route: any;
    navigation: any;
}




