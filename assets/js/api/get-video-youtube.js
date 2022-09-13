
function searchThisTrailer(movieDetailsData){
    const movieName = movieDetailsData.title;
    const queryConvert = movieName.replaceAll(' ', '+');
    const queryString = `${queryConvert}+trailer+oficial+legendado`;
    const movieProviderURL = getTrailerYoutubeURL(queryString);
    const promisseGetTrailerID = getTrailerYT(movieProviderURL);


    
    // const trailerKey = getIdTrailerYT(trailerYTData);
    // console.log(promisseGetTrailerID);
    return promisseGetTrailerID;
}

function getTrailerYoutubeURL(queryString) {
    const paramAPI = "&key=AIzaSyDuKdfOkczyVa7A384-OOQuh9d5o1wwDa4";
    const paramQuerySearch = `?q=${queryString}`;
    const movieProviderURL = `https://www.googleapis.com/youtube/v3/search${paramQuerySearch}${paramAPI}`;
    return movieProviderURL;
}

async function getTrailerYT(movieProviderURL){
    try {
        const promiseTrailerYT = await axios.get(movieProviderURL);
        const trailerYTData = promiseTrailerYT.data;
        const finalKey = getKeyTrailerYT(trailerYTData);
        return finalKey
        // getKeyTrailerYT(trailerYTData)

    } catch (e) {
        console.log("ERRO: ",e)
    }
}

function getKeyTrailerYT(trailerYTData){
    const trailerKey = trailerYTData.items[0].id.videoId;
    return trailerKey
}

