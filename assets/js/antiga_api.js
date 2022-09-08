//Gera uma URL aleatoria com um filme
function generateRandomUrl(){
    var movieID = saveGenerateID();
    var apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const languageURL = "&language=pt-BR"
    const randomMovieUrl = `https://api.themoviedb.org/3/movie/${movieID}${apiKeyURL}${languageURL}`;  
    
    getMovieDataProvider(movieID)

    return randomMovieUrl
}


//ID Sorteado
function generateRandomID(){
    const movieID = Math.floor(Math.random() * 9999) + 1

    //DEBUG
    //680 PulpFiction
    //1538 Colateral
    // const movieID = 680;
    console.log("ID SORTEADO: ", movieID);

    return movieID;
}

//Salvar ID sorteado
function saveGenerateID(){
    let randomIDSaved = generateRandomID();
    return randomIDSaved
}
    
    
getMovieData();
//GET DETALHES DO FILME
async function getMovieData(){  
    try {
        const response = await axios({
            method: 'get',
            url: generateRandomUrl(),    
            headers: {
                'Content-Type':'application/json'
            }
        })
        
        const movieData = response.data;
        // console.log(movieData); 
        
        const movieTitle = movieData.title;
        const movieResume = movieData.overview;
        const movieReleaseDate = movieData.release_date.split("-").reverse().join("/");
        const movieGenerosArray = movieData.genres;
        const movieAdults = movieData.adult;

        const movieGenresArea = document.querySelector(".genres-area");

        function createGenresTags(genres){
            $(".genres-area").innerHTML = '';
            var spanTag = document.createElement("span");
            var genreName = document.createTextNode(genres.name);
            spanTag.appendChild(genreName);
            movieGenresArea.appendChild(spanTag);
        }
        
        const movieCover = movieData.poster_path;
        const imageURL = `https://image.tmdb.org/t/p/original${movieCover}`;

        if (movieCover == null) {
            getMovieData();
        } else if (movieResume == "") {
            getMovieData();
        } else if (movieTitle == "") {
            getMovieData();
        } else if (movieGenerosArray == "") {
            getMovieData();
        } else if (movieAdults == true) {
            getMovieData();
        } else {
            $(document).ready(function() {
                if (movieTitle, movieResume, movieCover) {
                    $(".title-movie").text(movieTitle);
                    $(".resume-movie").text(movieResume); 
                    $(".cover-movie").attr("src",imageURL); 
                    $(".release-date").text(movieReleaseDate); 
                    
                    movieGenerosArray.map(createGenresTags);

                    if(!$(".providers-component").find('img').length > 0){
                        avisoSemProvedores()
                    }

                    setTimeout(() => {
                        $(".preloader").removeClass("active");
                    }, 500)
                }
            })
        }
        
    } catch (error) {
        getMovieData();
    }
}

//GERA A URL PARA CONSULTA DE PROVEDORES
function generateUrlProviders(movieID){
    const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const urlProvider = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers${apiKeyURL}`;    
    return urlProvider
}

//
function avisoSemProvedores(){
    $(document).ready(function() {
        const providerComponent = document.querySelector(".providers-component");
        $(providerComponent).find(".plataforms-avaible").text("Não foram localizados nenhuma plataforma de stream que tenha este filme em seu catálogo.");
    })
}

//GET PROVEDORES DO FILME
async function getMovieDataProvider(movieID){  
    try {
        const responseProvider = await axios({
            method: 'get',
            url: generateUrlProviders(movieID),    
            headers: {
                'Content-Type':'application/json'
            }
        })
        
        const movieDataProvider = responseProvider.data;
        console.log(movieDataProvider)

        // if (!('BR' in movieDataProvider.results)){
        //     avisoSemProvedores()
        // }

        // if (!('flatrate' in movieDataProvider.results['BR'])){
        //     avisoSemProvedores()
        // }

        const movieProvidersResults = movieDataProvider.results;
        const movieProvidersBR = movieProvidersResults.BR;
        const urlMovieDataProvider = movieProvidersBR.link; 
        console.log(urlMovieDataProvider)
        const movieProvidersFlatrate = movieProvidersBR.flatrate;

        // if(movieDataProvider.results) {
        //     const movieProvidersResults = movieDataProvider.results;
        //     console.log("XXX"); 
        //     return movieProvidersResults
        // }

        // if(movieDataProvider.results['BR']){
        //     const movieProvidersBR = movieProvidersResults.BR;
        //     console.log("YYY"); 
        //     return movieProvidersBR
        // }
        
        // if(movieDataProvider.results.br.flatrate){
        //     const movieProvidersFlatrate = movieProvidersBR.flatrate;
        //     return movieProvidersFlatrate
        // }

        const movieProviderArea = document.querySelector(".providers-area");
        
        function createProviderIcons(movieProvidersFlatrate){
            $(".providers-area").innerHTML = '';
            let imageTag = document.createElement("img");
            let providerPath = movieProvidersFlatrate.logo_path;
            const urlImageIcon = `https://www.themoviedb.org/t/p/original${providerPath}`;
            imageTag.src = urlImageIcon;
            movieProviderArea.appendChild(imageTag);
        }
        
        
    } catch (error) {
        // getMovieData();
    }
}










// //Ultimo ID URL
// function generateLastMovieURL(){
//     const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
//     const lastMovieURL = `https://api.themoviedb.org/3/movie/latest${apiKeyURL}`;
//     return lastMovieURL
// }

// async function getLastID(){
//     try {
//         const promiseMoviesLastID = await axios.get(generateLastMovieURL());
//         const moviesLastID = promiseMoviesLastID.data.id;
//         // console.log(moviesLastID)
//         return generateRandomID(moviesLastID);
        
//     } catch (e) {
//         console.log(e)
//     }
// }
// console.log(getLastID())

// function generateLastMovieURL(){
//     const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
//     const lastMovieURL = `https://api.themoviedb.org/3/movie/latest${apiKeyURL}`;
//     return lastMovieURL
// }



