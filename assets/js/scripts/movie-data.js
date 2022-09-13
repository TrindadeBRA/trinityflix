//Cria um array com os dados do container
function createArrayContent(resumeOfMovie, trailerAndProviderOfMovie){
    const arrayWithAllContent = [];
    arrayWithAllContent.push(resumeOfMovie, trailerAndProviderOfMovie);
    insertContent(arrayWithAllContent);
    // console.log(arrayWithAllContent);
}

//Separa dados do primeiro container - ResumeOfMovie
function movieResumeData(movieDetailsData){
    const movieTranslationArray =  movieDetailsData.translations.translations;

    const movieTranslationDataBR = movieTranslationArray.filter(obj => {
        return obj.iso_3166_1 === "BR";
    })

    console.log(movieTranslationDataBR)
    const movieTranslatedTilte = movieTranslationDataBR[0].data.title;
    const movieTranslatedResume = movieTranslationDataBR[0].data.overview;

    const movieTitle = movieTranslatedTilte;
    const movieResume = movieTranslatedResume;
    
    // const movieTitle = movieDetailsData.title;
    // const movieResume = movieDetailsData.overview;

    const movieOgTitle = movieDetailsData.original_title;
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




    console.log("movieResumeData: ", movieResumeData);
    
    return movieResumeData;

}







//Separa dados do segundo container - trailerAndProviderOfMovie
 function movieTrailerAndProviderData(movieDetailsData){

    //Trailer
    // console.log("XXXXXXXXXXXXX>> ", movieDetailsData);

    const movieTrailerArray = movieDetailsData.videos.results;
    const movieTrailerArrayData = getTrailerData(movieTrailerArray);
    const movieTrailerSite = movieTrailerArrayData.site;
    const movieTrailerKey = movieTrailerArrayData.key;

    // const movieYoutubeKeyAPI = searchThisTrailer(movieDetailsData);

    // console.log("Key tem q dropar aqui> ",movieYoutubeKeyAPI)       


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
            site: "api-yt-trailer"
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