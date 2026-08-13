const apiKey = "36629f0d39e96287cdf12b7db8f64247";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w300";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results-grid");
const statusMessage = document.getElementById("status-message");

//get the codes here: https://developer.themoviedb.org/reference/account-rated-movies

async function loadTrendingMovies()
{
    const url = baseUrl + "/trending/movie/week?api_key=" + apiKey;
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);
}



async function searchMovies(search)
{
    const url = baseUrl + "/search/movie?api_key=" + apiKey + "&query=" + search;
    const response = await fetch(url);
    const data = await response.json();

    showMovies(data.results);
}

searchForm.addEventListener("submit", searchEvent);

function searchEvent(event)
{
    const search = searchInput.value.trim();

    if (search === "")
    {
        loadTrendingMovies();
    }
    else
    {
        searchMovies(search);
    }
}

//this says it can be used in place of textContent for stuff that isnt text https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent


function showMovies(movies)
{
    resultsDiv.innerHTML = "";

    if (movies.length === 0)
    {
        statusMessage.innerHTML = "no movies found";
        return;
    }

    statusMessage.innerHTML = "";

    let movieCards = "";


    for (let i = 0; i < movies.length; i++)
    {
        const movie = movies[i];

        if (movie.poster_path)
        {
            posterSrc = imageUrl + movie.poster_path;
        }

        let year = "";
        if (movie.release_date)
        {
            year = movie.release_date;
        }

        movieCards += `<div class="movie-card">
                       <img src="${posterSrc}" alt="${movie.title} poster">
                       <h3>${movie.title}</h3>
                       <p>${year} | Ratings: ${movie.vote_average.toFixed(1)}/10</p>
                       </div>`;
    }

    resultsDiv.innerHTML = movieCards;
}





loadTrendingMovies();