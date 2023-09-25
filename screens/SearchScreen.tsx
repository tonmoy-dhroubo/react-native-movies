import { useEffect, useState } from "react";
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { SearchResultList } from "../interfaces/All";
import { getSearchResults } from "../api";
import SearchCard from "../components/Search/SearchCard";
import { ChevronLeftIcon, XCircleIcon } from "react-native-heroicons/outline";


export default function SearchScreen(props: SearchScreenProps) {

    const [searchResults, setSearchResults] = useState({} as SearchResultList);
    const [query, setQuery] = useState('' as string);


    useEffect(() => {
            getSearch(query);
        }, [query]
    );

    async function getSearch(q: string){
        const response = await getSearchResults(q);
        if(response) setSearchResults(response);
        else setSearchResults({} as SearchResultList);
    }

    return(
        <View className="flex-1 bg-slate-950">
            {/* Back Button */}
            <SafeAreaView  className="absolute z-20 flex-1 " >
                <TouchableOpacity 
                className="p-3 mt-3 ml-3 rounded-xl bg-slate-950/70"
                onPress={() => props.navigation.goBack()}
                >
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
                
            </SafeAreaView>

            {/* Title */}
            <View>
                <Text className="mt-4 ml-4 text-3xl text-center text-white">Search</Text>
            </View>
            
            {/* Search Bar */}
            <View className="relative flex flex-row h-12 mx-2 my-4 rounded-xl bg-slate-800">
                <TextInput
                    value={query}
                    placeholder="Search"
                    placeholderTextColor={'#9CA3AF'}
                    className="p-2 text-xl text-slate-200"
                    onChangeText={text => setQuery(text)}
                />

                <View className="absolute right-0 z-40 top-1">
                    <XCircleIcon 
                        size="40"
                        color="white"
                        onPress={() => query.length > 0 ? setQuery('') : null}
                    />
                </View>
                
            </View>

            {/* <View className="flex items-center justify-center">
                { searchResults.total_results === undefined && <Text className="text-xl text-white">No Results Found</Text>}
            </View> */}

            {/* Search Results */}
            <ScrollView>
                {searchResults.results?.map((result, index) => {
                    return(
                        <View key={index}>
                            <SearchCard movieDetails={result} navigation={props.navigation}></SearchCard>   
                        </View>
                    )
                })}
                
            </ScrollView>
        </View>
    );
}

interface SearchScreenProps{
    navigation: any;
    route: any;
}