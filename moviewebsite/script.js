
// TMDB API KEY

const API_KEY = "api_key=2c46288716a18fb7aadcc2a801f3fc6b";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;
const POPULAR_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const NOW_URL = BASE_URL + "/discover/movie?primary_release_year=2010&" + API_KEY;


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tags = document.getElementById("tags");
const tagPopular = document.getElementById("popular");
const tagNow = document.getElementById("now");
const tagFavorite = document.getElementById("favorit");


getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        // console.log(data);
        showMovies(data.results);
    })
}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `

            <img src="${IMG_URL + poster_path}" alt="${title}">
        
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <button type="button">Add</button>
            </div>
        `
        main.appendChild(movieEl);
    })
}


function getColor(vote) {
    if(vote >= 8){
        return "green";
    }else if (vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    } else {
        getMovies(API_URL);
    }
})



tagPopular.addEventListener('click', function() {
    getMovies(POPULAR_URL);
})

tagNow.addEventListener('click', function() {
    getMovies(NOW_URL);
})

