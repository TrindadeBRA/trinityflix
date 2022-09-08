async function getData(){
    const movieID = generateRandomID();
    try {
        const promiseMoviesDetail = await axios.get(generateRandomMovieUrl(movieID));
        const promiseMoviesProviders = await axios.get(generateUrlProviders(movieID));

        const moviesDetail = promiseMoviesDetail.data;
        const moviesProviders = promiseMoviesProviders.data;
        
        console.log(moviesDetail, moviesProviders.results);

        saveMovieDetails(moviesDetail, moviesProviders)
    } catch (e) {
        getData()
    }
}
getData()


function generateRandomID(){
    const movieID = Math.floor(Math.random() * (10000 - 0) + 0);
    
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
    
    if ('flatrate' in moviesProviders.results['BR'], 'rent' in moviesProviders.results['BR'], 'buy' in moviesProviders.results['BR']){
        const movieProvidersFlatrate = moviesProviders.results.BR.flatrate;
        const movieProvidersRent = moviesProviders.results.BR.rent;
        const movieProvidersBuy = moviesProviders.results.BR.buy;

        insertContent(movieTitle, movieResume, movieCover, movieReleaseDate, movieGenerosArray, movieProvidersFlatrate, movieProvidersBuy, movieProvidersRent)    
    } else {
        throw Error();
    }

    // if ('rent' in moviesProviders.results['BR']){
    //     const movieProvidersRent = moviesProviders.results.BR.rent;
    //     return movieProvidersRent;
    // }

    // if ('buy' in moviesProviders.results['BR']){
    //     const movieProvidersBuy = moviesProviders.results.BR.buy;
    //     return movieProvidersBuy
    // }

    // if (!('flatrate' in moviesProviders.results['BR'])){
    //     throw Error();
    // }
    

}

async function insertContent(movieTitle, movieResume, movieCover, movieReleaseDate, movieGenerosArray, movieProvidersFlatrate, movieProvidersBuy, movieProvidersRent){
    //Details
    await $(".title-movie").text(movieTitle);
    await $(".resume-movie").text(movieResume); 
    await $(".cover-movie").attr("src",movieCover); 
    await $(".release-date").text(movieReleaseDate); 
    await movieGenerosArray.map(createGenresTags);
    
    //Provider
    await movieProvidersFlatrate.map(createProviderIcons);
    await movieProvidersBuy.map(createProviderIconsBuy);
    await movieProvidersRent.map(createProviderIconsRent);

    
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

function createProviderIconsBuy(movieProvidersBuy){
    const movieProviderArea = document.querySelector(".buy-area");
    $(".buy-area").innerHTML = '';
    let imageTag = document.createElement("img");
    const urlImageIcon = `https://www.themoviedb.org/t/p/original${movieProvidersBuy.logo_path}`;
    imageTag.src = urlImageIcon;
    movieProviderArea.appendChild(imageTag);
}

function createProviderIconsRent(movieProvidersRent){
    const movieProviderArea = document.querySelector(".rent-area");
    $(".rent-area").innerHTML = '';
    let imageTag = document.createElement("img");
    const urlImageIcon = `https://www.themoviedb.org/t/p/original${movieProvidersRent.logo_path}`;
    imageTag.src = urlImageIcon;
    movieProviderArea.appendChild(imageTag);
}


