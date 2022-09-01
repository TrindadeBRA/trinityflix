
//Gera uma URL aleatoria com um filme
function generateRandomUrl(){
    var movieID = Math.floor(Math.random() * 10000);
    var apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const languageURL = "&language=pt-BR"
    const randomMovieUrl = `https://api.themoviedb.org/3/movie/${movieID}${apiKeyURL}${languageURL}`;    
    return randomMovieUrl
}


//Ultimo ID URL
function generateLastMovieURL(){
    const apiKeyURL = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const lastMovieURL = `https://api.themoviedb.org/3/movie/latest${apiKeyURL}`;
    return lastMovieURL
}

//GET URL API
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
        const movieGenerosArray = movieData.genres;
        const movieAdults = movieData.adult;

        const movieGenresArea = document.querySelector(".genres-area");

        function createGenresTags(genres){
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
                    movieGenerosArray.map(createGenresTags);
                    
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

getMovieData();
