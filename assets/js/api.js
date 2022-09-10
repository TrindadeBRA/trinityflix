async function getData(){
    try {
        const promiseDiscoverMovie = await axios.get(generateDiscoverURL());
        const discoverMovieData = promiseDiscoverMovie.data;

        separateValues(discoverMovieData)
    } catch (e) {
        getData()
    }
}
getData()

async function getDataVideo(movieID){
    try {
        const promiseMovieVideo = await axios.get(getMoviesVideos(movieID));
        const movieVideoData = promiseMovieVideo.data;

        const movieVideoResults = movieVideoData.results
        const movieVideoYTData = movieVideoResults[0]

        const iframeURL = `https://www.youtube.com/embed/${movieVideoYTData.key}`
        const iframeTitle = movieVideoYTData.name

        $("#iframe-videos").attr("src", iframeURL)
        $("#iframe-videos").attr("title", iframeTitle)

        console.log(movieVideoYTData)

    } catch (e) {
        console.log(e)
    }
}

async function insertContent(selectedMovie){
    const movieTitle = selectedMovie.title;
    const movieOgTitle = selectedMovie.original_title;
    const movieResume = selectedMovie.overview;
    const movieID = selectedMovie.id;
    getDataVideo(movieID)
    const movieReleaseDate = selectedMovie.release_date.split("-").reverse().join("/");
    const movieCover = `https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`;
    const movieBackground = `https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`;
    const movieGenerosArray = selectedMovie.genre_ids;

    //Details
    await $(".title-movie").text(movieTitle);
    await $(".original-title").text(movieOgTitle);
    await $(".resume-movie").text(movieResume); 
    await $(".cover-movie").attr("src",movieCover); 
    await $(".layout-movie ").attr("style",`background-image:url(${movieBackground});`); 
    await $(".release-date").text(movieReleaseDate); 
    await movieGenerosArray.map(createGenresTags);


    $(document).ready(function(){
        setTimeout(() => {
            $(".preloader").removeClass("active");
        }, 750)
    })

}

function getMoviesProvider(movieID) {
    const paramAPI = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const movieVideoURL = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers${paramAPI}`;
    // console.log(movieVideoURL)
    return movieVideoURL
}

function getMoviesVideos(movieID) {
    const paramAPI = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const movieProviderURL = `https://api.themoviedb.org/3/movie/${movieID}/videos${paramAPI}`;
    // console.log(movieProviderURL)
    return movieProviderURL
}

function createGenresTags(movieGenerosArray){
    $(".genres-area").innerHTML = '';
    const movieGenresArea = document.querySelector(".genres-area");
    const spanTag = document.createElement("span");
    const genreName = convertGenresNames(movieGenerosArray)
    const genreName2 = document.createTextNode(genreName);
    spanTag.appendChild(genreName2);
    movieGenresArea.appendChild(spanTag);
}

function separateValues(discoverMovieData){
    const movieResult = getRandomInt(0, 19);
    const selectedMovie = discoverMovieData.results[movieResult];
    console.log(selectedMovie)
    
    insertContent(selectedMovie);
}

function generateDiscoverURL(){
    const paramAPI = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const paramlanguage = "&language=pt-BR";
    const page = getRandomInt(1, 100);
    const paramPage = `&page=${page}`;
    const paramVoteCount = "&sort_by=vote_count.desc";
    const discoverURL = `https://api.themoviedb.org/3/discover/movie${paramAPI}${paramlanguage}${paramVoteCount}${paramPage}`;
    // console.log(discoverURL)
    
    return discoverURL
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function convertGenresNames(genreID){
    switch (genreID) {
        case 28:
            return "Ação";
            break;

        case 12:
            return "Aventura";
            break;
        
        case 16:
            return "Animação";
            break;

        case 35:
            return "Comédia";
            break;
        
        case 80:
            return "Crime";
            break;

        case 99:
            return "Documentário";
            break;
        
        case 18:
            return "Drama";
            break;

        case 10751:
            return "Família";
            break;
        
        case 14:
            return "Fantasia";
            break;

        case 36:
            return "História";
            break;
        
        case 27:
            return "Horror";
            break;

        case 10402:
            return "Música";
            break;
        
        case 9648:
            return "Mistério";
            break;

        case 10749:
            return "Romance";
            break;
        
        case 878:
            return "Ficção Científica";
            break;

        case 10770:
            return "TV Movie";
            break;

        case 53:
            return "Suspense";
            break;

        case 10752:
            return "Guerra";
            break;
        
        case 37:
            return "Faroeste";
            break;

        default:
            break;
        
    }
}