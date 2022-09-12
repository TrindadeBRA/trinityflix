//Gera um numero automático entre min e max.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Gera a URL aleatória necessária para buscar uma lista de filmes.
function generateDiscoverURL(){
    const paramAPI = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const paramlanguage = "&language=pt-BR";
    const page = getRandomInt(1, 100);
    const paramPage = `&page=${page}`;
    const paramVoteCount = "&sort_by=vote_count.desc";
    const discoverURL = `https://api.themoviedb.org/3/discover/movie${paramAPI}${paramlanguage}${paramVoteCount}${paramPage}`;
    return discoverURL;
}

//Busca uma lista de filmes.
async function getMovieListFromDiscoveryURL(){
    try {
        const promiseDiscoverMovie = await axios.get(generateDiscoverURL());
        const discoverMovieData = promiseDiscoverMovie.data;
        separateMovieFromList(discoverMovieData);
    } catch (e) {
        console.log("Erro ao buscar a lista de filmes do servidor. ", e);
    }
}
getMovieListFromDiscoveryURL()

//Separa um fime aleatório da lista de filmes.
function separateMovieFromList(discoverMovieData){
    const moviePositionFromList = getRandomInt(0, 19);
    const selectedMovieFromList = discoverMovieData.results[moviePositionFromList];
    getIDMovie(selectedMovieFromList);
}

//Separa o ID do filme
function getIDMovie(selectedMovieFromList){
    movieID = selectedMovieFromList.id;
    getMoviesSelectedDataURL(movieID)
}
