//Insere os dados no html
async function insertContent(arrayWithAllContent){

    //primeiro container - ResumeOfMovie
    await $(".title-movie").text(arrayWithAllContent[0].title);
    await $(".original-title").text(arrayWithAllContent[0].originalTitle);
    await $(".resume-movie").text(arrayWithAllContent[0].resume); 
    await $(".cover-movie").attr("src",arrayWithAllContent[0].cover); 
    await $(".layout-movie ").attr("style",`background-image:url(${arrayWithAllContent[0].background});`); 
    await $(".release-date").text(arrayWithAllContent[0].releaseDate);
    const genresArray = arrayWithAllContent[0].genresArray;
    await genresArray.map(createGenresTags);

    //segundo container - movieTrailerAndProvider
    const iframeURL = `https://www.youtube.com/embed/${arrayWithAllContent[1].trailerKey}`;
    $("#iframe-videos").attr("src", iframeURL);
    const providersArray = arrayWithAllContent[1].providers;
    console.log("XXXX> ", arrayWithAllContent);

    createIconsProviders(providersArray)

    $(document).ready(function(){
        setTimeout(() => {
            $(".preloader").removeClass("active");
        }, 750)
    })
}

//Cria um span para cada categoria do array
function createGenresTags(genresArray){
    const movieGenresArea = document.querySelector(".genres-area");
    const spanTag = document.createElement("span");
    const genreName = document.createTextNode(genresArray.name);
    spanTag.appendChild(genreName);
    movieGenresArea.appendChild(spanTag);
}

//Cria icones dos providers array
function createIconsProviders(providersArray){
    // console.log("XXXX> ", providersArray);

    const providerArrayFlatrate = providersArray.flatrate;
    const providerArrayRent = providersArray.rent;
    const providerArrayBuy = providersArray.buy;


    if (providerArrayFlatrate.length === 0){
        $(".watch-online").addClass('d-none');
    } else {
        // console.log(providerArrayFlatrate)
        const divWatch = $(".icons-watch-online");
        mapIconsProviders(providerArrayFlatrate, divWatch);
    }

    if (providerArrayRent.length === 0){
        $(".rent-online").addClass('d-none');
    } else {
        // console.log(providerArrayRent)
        const divRent = $(".icons-rent-online");
        mapIconsProviders(providerArrayRent, divRent);

    }

    if (providerArrayBuy.length === 0){
        $(".buy-online").addClass('d-none');
    } else {
        // console.log(providerArrayBuy)
        const buyWatch = $(".icons-buy-online");
        mapIconsProviders(providerArrayBuy, buyWatch);
    }

    if(providerArrayFlatrate.length === 0 && providerArrayRent.length === 0 && providerArrayBuy.length === 0){
        console.log("XXXX")
    }
}

function mapIconsProviders(providerArray, elementPath){
    providerArray.map(function(item){
        const providerName = item.name;
        const providerIconPath = `https://image.tmdb.org/t/p/original${item.logo}`;

        const imgTag = document.createElement("img");
        imgTag["src"] = providerIconPath;
        imgTag["alt"] = providerName;
        imgTag["title"] = providerName;


        elementPath[0].appendChild(imgTag);
        
        // console.log(elementPath)
    })
}



