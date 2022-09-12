//Cria um array com os dados do container
function createArrayContent(resumeOfMovie, trailerAndProviderOfMovie){
    const arrayWithAllContent = [];
    arrayWithAllContent.push(resumeOfMovie, trailerAndProviderOfMovie);
    insertContent(arrayWithAllContent);
    // console.log(arrayWithAllContent);
}

//Separa dados do primeiro container - ResumeOfMovie
function movieResumeData(movieDetailsData){
    const movieTitle = movieDetailsData.title;
    const movieOgTitle = movieDetailsData.original_title;
    const movieResume = movieDetailsData.overview;
    const movieReleaseDate = movieDetailsData.release_date.split("-").reverse().join("/");
    const movieCover = `https://image.tmdb.org/t/p/original${movieDetailsData.poster_path}`;
    const movieBackground = `https://image.tmdb.org/t/p/original${movieDetailsData.backdrop_path}`;
    const movieGenerosArray = movieDetailsData.genres;

    const movieResumeData = {
        title: movieTitle,
        originalTitle: movieOgTitle,
        resume: movieResume,
        releaseDate: movieReleaseDate,
        cover: movieCover,
        background: movieBackground,
        genresArray: movieGenerosArray
    };

    // queryGeneratorYT(movieResumeData)

    console.log("movieResumeData: ", movieResumeData);
    
    return movieResumeData;

}


// function getTrailerYoutubeURL(queryString) {
//     const paramAPI = "&key=AIzaSyDXUWk9u72wm1jzmgVEqCcMJUtiML-bs8A";

//     const paramQuerySearch = `?q=${queryString.replaceAll(' ', '+')}`;
    
//     const movieProviderURL = `https://www.googleapis.com/youtube/v3/search${paramQuerySearch}${paramAPI}`;

//     getTrailerYT(movieProviderURL)
//     // return movieProviderURL
// }

// function queryGeneratorYT(movieResumeData){
//     const queryString = `${movieResumeData.title} trailer oficial legendado`
//     getTrailerYoutubeURL(queryString)
// }

// async function getTrailerYT(movieProviderURL){
//     try {
//         const promiseTrailerYT = await axios.get(movieProviderURL);
//         const trailerYTData = promiseTrailerYT.data;

//         const trailerID = getIdTrailerYT(trailerYTData)
//         return trailerID
//         // console.log(trailerYTData);

//     } catch (e) {
//         console.log("ERRO: ",e)
//     }
// }

// function getIdTrailerYT(trailerYTData){
//     const trailerID = trailerYTData.items[0].id.videoId;
//     return trailerID
// }






//Separa dados do segundo container - trailerAndProviderOfMovie
 function movieTrailerAndProviderData(movieDetailsData){

    //Trailer
    // console.log("XXXXXXXXXXXXX>> ", movieDetailsData);

    const movieTrailerArray = movieDetailsData.videos.results;
    const movieTrailerArrayData = getTrailerData(movieTrailerArray);
    const movieTrailerSite = movieTrailerArrayData.site;
    const movieTrailerKey = movieTrailerArrayData.key;

    //Provider
    const movieProviderResults = movieDetailsData["watch/providers"].results;
    const movieProvidersData = getProviderData(movieProviderResults);
    // console.log("Providers: ", movieProvidersData)
    

    const movieTrailerAndProviderData = {
        trailerSite: movieTrailerSite,
        trailerKey: movieTrailerKey,
        providers: movieProvidersData
    };

    console.log("movieTrailerAndProviderData: ", movieTrailerAndProviderData);

    return movieTrailerAndProviderData;
}

function getTrailerData(movieTrailerArray) {
    // console.log("movieTrailerArray: ", movieTrailerArray)
    if (movieTrailerArray.length === 0){
        const errorTrailer = {
            key: "NmwVnaSlZkw",
            site: "sem-trailer"
        }
        return errorTrailer;   
    } else {
        return movieTrailerArray[0]
    }
}

function getProviderData(movieProviderResults){

    if ('BR' in movieProviderResults){

        const movieProviderResultsBR = movieProviderResults["BR"];

        const providerList = {
            flatrate: [],
            buy: [],
            rent: []
        };

        if ('flatrate' in movieProviderResultsBR){
            const movieProviderFlatrate = movieProviderResultsBR.flatrate;
            
            movieProviderFlatrate.map(function(item) {

                const logo = item.logo_path;
                const providerName = item.provider_name;

                const flatrateData = {
                    name: providerName,
                    logo: logo
                }

                providerList.flatrate.push(flatrateData)
            })
            // console.log("Providor Array: ",providerFlatrateList)
        }

        if ('buy' in movieProviderResultsBR){
            const movieProviderBuyer = movieProviderResultsBR.buy;
            
            movieProviderBuyer.map(function(item) {

                const logo = item.logo_path;
                const providerName = item.provider_name;

                const buyerData = {
                    name: providerName,
                    logo: logo
                }

                providerList.buy.push(buyerData)
            })
            // console.log("Buyer Array: ",providerBuyerList)
        }
        
        if ('rent' in movieProviderResultsBR){
            const movieProviderRent = movieProviderResultsBR.rent;
            
            movieProviderRent.map(function(item) {

                const logo = item.logo_path;
                const providerName = item.provider_name;

                const rentData = {
                    name: providerName,
                    logo: logo
                }

                providerList.rent.push(rentData)
            })
            // console.log("Rent Array: ",providerRentList)
        

            // console.log(providerList)
        } 

        return providerList;

    } else {
        // console.log("Nenhum provedor foi encontrado")

        const providerList = {
            providers: null
        };

        return providerList;
    }
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}