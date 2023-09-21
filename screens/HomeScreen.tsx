import { View, Text, ScrollView, SafeAreaView, StatusBar, Button } from "react-native";
import {FilmIcon, MagnifyingGlassCircleIcon} from 'react-native-heroicons/outline'
import { getMoviesWithGenre, getTrendingMovies } from "../api";
import { useEffect, useState } from "react";
import { TrendingCarousel } from "../components/TrendingCarousel";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function HomeScreen() {

    // States
    const [trends, setTrends] = useState({} as any);
    const [genres, setGenres] = useState([]);
    const [doneTrends, setDoneTrends] = useState(false);
    const [doneGenres, setDoneGenres] = useState(false);
    const [genreAction, setGenreAction] = useState([] as any);

    useEffect(() => {
        getTrends();
        getGenres();
    },[]);

    async function getTrends(){
        const response = await getTrendingMovies();
        if(response) setTrends(response.results);
        setDoneTrends(true);
    }

    async function getGenres(){

        // const response : any = [];
        // const genreCodes = [28, 12, 16, 35, 80, 99, 18, 10751, 14, 36, 27, 10752]
        
        // genreCodes.forEach(async (code) => {
        //     const res = await getMoviesWithGenre(code);
        //     if(res && res.results) response.push(res.results);
        // });

        // setGenres(response);
        // setDoneGenres(true);
        // console.log(genres[11][0].title);

        const response = await getMoviesWithGenre(28);
        if(response) setGenreAction(response.results);

    }

    return(
    <>
        <View className="flex-1 bg-slate-950">
            <View className="mx-2 mt-2 ">
                {/* <Text className="text-white">Home</Text> */}
                <StatusBar backgroundColor="#000015" />
                <View className="flex-row items-center justify-between mx-4">
                    <FilmIcon size="50" color="white" />
                    <Text className="items-center text-2xl font-bold text-yellow-500">Bangla Movies</Text>
                    <MagnifyingGlassCircleIcon color="white" size="50"/>
                </View>
            </View>


            <ScrollView className="flex-1">
                {/* Carousel */}
                {/* { (doneTrends && trends.length > 0) && <TrendingCarousel data={trends} /> } */}

                {/* Genres */}
                { 
                    genres.map((genre : any, index: number) => {
                        return <Text className="" key={index}>{genre.title}</Text>
                        }
                    )
                }

                

            </ScrollView>


            

            <Button title="log" onPress={() => console.log(getMoviesWithGenre(28).results)}  />
            
        </View>

        

        {/* <Text className="text-white">
            {{trends.type()}}
        </Text> */}
    </>
    );
}