const apiKey = "36629f0d39e96287cdf12b7db8f64247";
const baseUrl = "https://api.themoviedb.org/3";
const imageUrl = "https://image.tmdb.org/t/p/w300";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsDiv = document.getElementById("results-grid");
const statusMessage = document.getElementById("status-message");

function loadTrendingMovies()
{
    const url = baseUrl + "/trending/movie/week?api_key=" + apiKey;
    const response = await fetch(url);
    const data = await response();

    showMovies(data);
}



function searchMovies(search)
{
    const url = baseUrl + "/discover/movie?api_key=" + apiKey;
    const response = await fetch(url);
    const data = await response();

    showMovies(data);
}




function showMovies(movies)
{
    resultsDiv.textContent = "";

    if (movies.length === 0)
    {
        statusMessage.textContent = "no movies found";
        return statusMessage;
    }
}