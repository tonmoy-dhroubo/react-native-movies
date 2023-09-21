import axios from "axios";
// // import { apiKey } from "../constants";

const apiKey = '11b03d27bb82e4a75fced23d9cb7c53b';
// // endpoints
const baseUrl = 'https://api.themoviedb.org/3';
const baseImgUrl = 'https://image.tmdb.org/t/p/';

async function request(url: string, params: any) {
    try {
        return  (await axios.get(url, { params: { ...params, api_key: apiKey } })).data;
    } catch (error) {
        console.log(error);
        return 'API ERROR';
    }
}

const trendingUrlOriginal = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
// https://api.themoviedb.org/3/trending/movie/day?api_key=11b03d27bb82e4a75fced23d9cb7c53b
//https://api.themoviedb.org/3/discover/movie?page=1&with_original_language=bn&sort_by=popularity.desc&api_key=11b03d27bb82e4a75fced23d9cb7c53b&with_genres=28
// const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
// const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
// const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;
const trendingUrl = `${baseUrl}/discover/movie?page=1&with_original_language=bn&sort_by=popularity.desc`;
const genresUrl = `${baseUrl}/discover/movie?page=1&with_original_language=bn&sort_by=popularity.desc`;

export function getTrendingMovies(){
    return request(trendingUrl, {});
}

export function getMoviesWithGenre(genreId: number){
    const fullUrl = genresUrl + `&api_key=${apiKey}` + '&with_genres=' + genreId.toString();
    const res = request(genresUrl, {with_genres: genreId.toString()});
    console.log(fullUrl);
    return res;
}

// // endpoints with dynamic params

// // movie
// const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
// const movieCreditsEndpoint = id=> `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
// const similarMoviesEndpoint = id=> `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// // person
// const personDetailsEndpoint = id=> `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
// const personMoviesEndpoint = id=> `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// // functions to get images of different widths, (show images using these to improve the loading times)
// export const image500 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
// export const image342 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
// export const image185 = posterPath=> posterPath? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export function getImg(img: string, size : number){
    switch (size){
        case 500:
            return baseImgUrl + 'w500' + img;
        case 342:
            return baseImgUrl + 'w342' + img;
        case 185:
            return baseImgUrl + 'w185' + img;
        default:
            return baseImgUrl + 'w500' + img;
    }
}


// // fallback images 
// export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
// export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';

// const apiCall = async (endpoint, params)=>{
//     const options = {
//         method: 'GET',
//         url: endpoint,
//         params: params? params: {}
//     };

//     try{
//         const response = await axios.request(options);
//         return response.data;
//     }catch(error){
//         console.log('error: ',error);
//         return {};
//     }
// }

// // home screen apis
// export const fetchTrendingMovies = ()=>{
//     return apiCall(trendingMoviesEndpoint);
// }
// export const fetchUpcomingMovies = ()=>{
//     return apiCall(upcomingMoviesEndpoint);
// }
// export const fetchTopRatedMovies = ()=>{
//     return apiCall(topRatedMoviesEndpoint);
// }


// // movie screen apis
// export const fetchMovieDetails = (id)=>{
//     return apiCall(movieDetailsEndpoint(id));
// }
// export const fetchMovieCredits = (movieId)=>{
//     return apiCall(movieCreditsEndpoint(movieId));
// }
// export const fetchSimilarMovies = (movieId)=>{
//     return apiCall(similarMoviesEndpoint(movieId));
// }

// // person screen apis
// export const fetchPersonDetails = (personId)=>{
//     return apiCall(personDetailsEndpoint(personId));
// }
// export const fetchPersonMovies = (personId)=>{
//     return apiCall(personMoviesEndpoint(personId));
// }

// // search screen apis
// export const searchMovies = (params)=>{
//     return apiCall(searchMoviesEndpoint, params);
// }
