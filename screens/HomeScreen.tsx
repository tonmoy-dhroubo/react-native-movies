import { View, Text, ScrollView, SafeAreaView, StatusBar, Button } from "react-native";
import {FilmIcon, MagnifyingGlassCircleIcon} from 'react-native-heroicons/outline'
import { getMoviesWithGenre, getTrendingMovies } from "../api";
import { useEffect, useState } from "react";
import { TrendingCarousel } from "../components/Home/TrendingCarousel";
import { GenreSlider } from "../components/Home/GenreSlider";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {

    // States
    const [trends, setTrends] = useState({} as any);
    const [doneTrends, setDoneTrends] = useState(false);

    const [genreAction, setGenreAction] = useState([] as any);
    const [genreAdventure, setGenreAdventure] = useState([] as any);
    const [genreHistory, setGenreHistory] = useState([] as any);
    const [genreHorror, setGenreHorror] = useState([] as any);
    const [genreWar, setGenreWar] = useState([] as any);
    const navigator = useNavigation();

    useEffect(() => {
        getTrends();
        getGenreAction();
        getGenreAdventure();
        getGenreHistory();
        getGenreHorror();
        getGenreWar();


    },[]);

    async function getTrends(){
        const response = await getTrendingMovies();
        if(response) setTrends(response.results);
        setDoneTrends(true);
    }

    async function getGenreAction(){
        const response = await getMoviesWithGenre(28);
        if(response) setGenreAction(response.results);
    }

    async function getGenreAdventure(){
        const response = await getMoviesWithGenre(12);
        if(response) setGenreAdventure(response.results);
    }

    async function getGenreHistory(){
        const response = await getMoviesWithGenre(36);
        if(response) setGenreHistory(response.results);
    }

    async function getGenreHorror(){
        const response = await getMoviesWithGenre(27);
        if(response) setGenreHorror(response.results);
    }

    async function getGenreWar(){
        const response = await getMoviesWithGenre(10752);
        if(response) setGenreWar(response.results);
    }

    return(
    <>
        <View className="flex-1 bg-slate-950">

            {/* Status Bar */}
            <View className="mx-2 mt-2 ">
                <StatusBar backgroundColor="#000015" />
                <View className="flex-row items-center justify-between mx-4">
                    <FilmIcon size="50" color="white" />
                    <Text className="items-center text-2xl font-bold text-cyan-300">Bangla Movies</Text>
                    <MagnifyingGlassCircleIcon color="white" size="50" onPress={()=>navigator.navigate('Search' as never)} />
                </View>
            </View>

            
            {/* Content */}
            <ScrollView className="flex-1">

                {/* Carousel */}
                { (doneTrends && trends.length > 0) && <TrendingCarousel data={trends} /> }

                {/* Genres */}
                { genreAction.length > 0 && <GenreSlider title="Action" data={genreAction} /> }
                { genreAdventure.length > 0 && <GenreSlider title="Adventure" data={genreAdventure} /> }
                { genreHistory.length > 0 && <GenreSlider title="History" data={genreHistory} /> }
                { genreHorror.length > 0 && <GenreSlider title="Horror" data={genreHorror} /> }
                { genreWar.length > 0 && <GenreSlider title="War" data={genreWar} /> }

            </ScrollView>

        </View>
    </>
    );
}