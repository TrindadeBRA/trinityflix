async function getData(){
    movieID = generateRandomID();
    try {
        const promiseMoviesDetail = await axios.get(generateRandomMovieUrl(movieID));
        const promiseMoviesProviders = await axios.get(generateUrlProviders(movieID));

        const moviesDetail = promiseMoviesDetail.data;
        const moviesProviders = promiseMoviesProviders.data;

        console.log(moviesDetail, moviesProviders);

        saveMovieDetails(moviesDetail, moviesProviders)
    } catch (e) {
        getData()
    }
}
getData()

function generateRandomID(){
    const movieID = Math.floor(Math.random() * 9999) + 1;
    // const movieID = 9955;
    console.log("ID SORTEADO: ", movieID);
    return movieID;
}

function generateRandomMovieUrl(movieID){
    const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const languageURL = "&language=pt-BR";
    const randomMovieUrl = `https://api.themoviedb.org/3/movie/${movieID}${apiKeyURL}${languageURL}&append_to_response=videos`;  
    return randomMovieUrl
}

function generateUrlProviders(movieID){
    const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const urlProvider = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers${apiKeyURL}`;    
    return urlProvider
}

function saveMovieDetails(moviesDetail, moviesProviders){
    const movieTitle = moviesDetail.title;
    const movieResume = moviesDetail.overview;
    const movieReleaseDate = moviesDetail.release_date.split("-").reverse().join("/");
    const movieGenerosArray = moviesDetail.genres;
    // const movieAdults = moviesDetail.adult;
    const movieCover = `https://image.tmdb.org/t/p/original${moviesDetail.poster_path}`;

    if (!('BR' in moviesProviders.results)){
        throw Error();
    }

    if (!('flatrate' in moviesProviders.results['BR'])){
        throw Error();
    }

    const movieProvidersFlatrate = moviesProviders.results.BR.flatrate;
    insertContent(movieTitle, movieResume, movieCover, movieReleaseDate, movieGenerosArray, movieProvidersFlatrate)    
}

async function insertContent(movieTitle, movieResume, movieCover, movieReleaseDate, movieGenerosArray, movieProvidersFlatrate){
    //Details
    await $(".title-movie").text(movieTitle);
    await $(".resume-movie").text(movieResume); 
    await $(".cover-movie").attr("src",movieCover); 
    await $(".release-date").text(movieReleaseDate); 
    await movieGenerosArray.map(createGenresTags);

    //Provider
    await movieProvidersFlatrate.map(createProviderIcons);
    
    setTimeout(() => {
        $(".preloader").removeClass("active");
    }, 500)
}

function createGenresTags(movieGenerosArray){
    $(".genres-area").innerHTML = '';
    const movieGenresArea = document.querySelector(".genres-area");
    var spanTag = document.createElement("span");
    var genreName = document.createTextNode(movieGenerosArray.name);
    spanTag.appendChild(genreName);
    movieGenresArea.appendChild(spanTag);
}

function createProviderIcons(movieProvidersFlatrate){
    const movieProviderArea = document.querySelector(".providers-area");
    $(".providers-area").innerHTML = '';
    let imageTag = document.createElement("img");
    const urlImageIcon = `https://www.themoviedb.org/t/p/original${movieProvidersFlatrate.logo_path}`;
    imageTag.src = urlImageIcon;
    movieProviderArea.appendChild(imageTag);
}