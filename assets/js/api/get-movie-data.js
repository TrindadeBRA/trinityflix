//Parametros de outras tipos de respostas sobre o filme.
function appendResponsesToURL() {
    const paramAppends = `&append_to_response=videos,images,credits,watch/providers,translations`;
    return paramAppends
}

//Cria uma URL para fazer a busca dos detalhes do filme.
function getMoviesSelectedDataURL(movieID) {
    const paramAPI = "?api_key=454ff844d6893b9ebd5a0f6c518568eb";
    const paramAppends = appendResponsesToURL();
    const languageURL = "&language=pt-BR";
    const movieProviderURL = `https://api.themoviedb.org/3/movie/${movieID}${paramAPI}${paramAppends}`;
    getMovieAllDetails(movieProviderURL)
}

//Buscar detalhes do filmes.
async function getMovieAllDetails(movieProviderURL){
    try {
        const promiseMovieDetails = await axios.get(movieProviderURL);
        const movieDetailsData = promiseMovieDetails.data;

        // console.log(movieDetailsData);
        const resumeOfMovie = movieResumeData(movieDetailsData);
        const trailerAndProviderOfMovie = movieTrailerAndProviderData(movieDetailsData);
        // movieResumeData(movieDetailsData);
        // movieTrailerAndProviderData(movieDetailsData);
        createArrayContent(resumeOfMovie, trailerAndProviderOfMovie)

        

    } catch (e) {
        console.log("ERRO: ",e)
    }
}
