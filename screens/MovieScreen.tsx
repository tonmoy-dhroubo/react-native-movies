import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import { getImg, getMovieCredits, getMovieDetails } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";
import CastSlider from "../components/Movie/CastSlider";
import { MovieCredits, MovieDetails } from "../interfaces/All";

const { width, height } = Dimensions.get("screen");

export default function MovieScreen(props: MovieScreenProps) {
    const movieId = props.route.params?.id;
    const [movieDetails, setMovieDetails] = useState<MovieDetails>(
        {} as MovieDetails
    );
    const [movieCredits, setMovieCredits] = useState<MovieCredits>(
        {} as MovieCredits
    );

    useEffect(() => {
        getDetails(movieId);
        getCredits(movieId);

        console.log(movieCredits);
        console.log("for map error =>  genre : " + typeof movieDetails.genres);
        console.log("for map error =>  details: " + movieDetails.title);
        console.log("for map error =>  id: " + movieId);
        console.log("for map error =>  id: " + movieDetails.title);
    }, [movieId]);

    async function getDetails(id: number) {
        const response = await getMovieDetails(id);
        if (response) setMovieDetails(response);
        if (response !== undefined) {
            console.log(response);
        } else {
            console.log("response not found yet");
        }
    }

    async function getCredits(id: number) {
        const response = await getMovieCredits(id);
        if (response) setMovieCredits(response);
    }

    return (
        <>
            {/* Back Button */}
            <SafeAreaView className="absolute z-20 flex-1">
                <TouchableOpacity
                    className="p-3 mt-3 ml-3 rounded-xl bg-slate-950/70"
                    onPress={() => props.navigation.goBack()}
                >
                    <ChevronLeftIcon
                        size="28"
                        strokeWidth={2.5}
                        color="white"
                    />
                </TouchableOpacity>
            </SafeAreaView>

            {movieDetails !== undefined && (
                <ScrollView className="bg-slate-950">
                    {/* Poster  */}
                    <View>
                        <Image
                            source={{
                                uri: getImg(movieDetails?.poster_path, 500),
                            }}
                            style={{ width: width, height: height / 2 }}
                        />
                        <LinearGradient
                            colors={[
                                "transparent",
                                "rgba(0,0,20, 0.5)",
                                "rgba(0, 0, 20, .8)",
                            ]}
                            style={{ width, height: height * 0.6 }}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            className="absolute bottom-0"
                        />
                    </View>

                    {/* Details */}
                    <View className="flex items-center justify-center flex-1 -mt-24">
                        {/* Title */}
                        <Text className="p-3 text-3xl font-bold text-white">
                            {movieDetails?.title}
                        </Text>

                        {/* Year and Rating */}
                        <View className="flex flex-row items-center justify-center flex-1 mb-2">
                            <Text className="mr-2 text-lg text-white">
                                {movieDetails?.release_date?.slice(0, 4)}
                            </Text>
                            {movieDetails.vote_average > 0 && (
                                <View className="flex-row items-center">
                                    <Text className="text-lg text-white">
                                        {movieDetails?.vote_average}
                                    </Text>
                                    <StarIcon size="16" color="yellow" />
                                </View>
                            )}
                        </View>

                        {/* Genres */}
                        <View className="flex flex-row items-center justify-center flex-1">
                            {movieDetails.genres !== undefined &&
                                movieDetails?.genres?.map((genre, index) => {
                                    return (
                                        <TouchableWithoutFeedback key={index}>
                                            <Text className="px-3 py-1 m-1 text-white rounded-xl bg-black/40 ">
                                                {genre?.name}
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    );
                                })}
                        </View>

                        {/* Overview */}
                        <Text className="p-3 text-white">
                            {movieDetails?.overview}
                        </Text>
                    </View>

                    <View>
                        {movieCredits.cast && (
                            <CastSlider
                                cast={movieCredits.cast}
                                navigation={props.navigation}
                            />
                        )}
                    </View>
                </ScrollView>
            )}
        </>
    );
}

interface MovieScreenProps {
    route: any;
    navigation: any;
}
