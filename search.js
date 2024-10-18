const movieId = location.search.split("=")[1];
const imagePrefix = "https://image.tmdb.org/t/p/w500/";

async function getMovie() {
    try {
        const {data} = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=95686a04581c305cc6d7e4ccff9d039a`)
        console.log(data);
        document.querySelector("h1").textContent = data.title;
        document.querySelector("img").src = imagePrefix + data.poster_path;
        document.querySelector(".movie-details p").textContent = data.overview;
        document.querySelector(".release-date").textContent = data.release_date;
        document.querySelector(".userScore").textContent = data.vote_average;
        document.querySelector(".genre").textContent = data.genre_ids;
    } catch (error) {
        console.log(error);
    }
}

getMovie();





