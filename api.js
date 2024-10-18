const apiKey = "94710dbf3e97846c6b959f9714538145";
let urlNew = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.searchBtn');
const container = document.querySelector(".container");
const favorites = JSON.parse(localStorage.getItem("favs")) || [];
const genre = document.querySelector('.genre');


function switchUrl(isSearch) {
  urlNew = isSearch 
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchInput.value)}&page=1`
    : `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
}


async function getMovie() {
  try {
    const { data: { results } } = await axios(urlNew);
    container.innerHTML = '';
    results.forEach((movie) => renderMovie(movie));
    attachMovieEventListeners(results);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}


function renderMovie(movie) {
  const voteAverage = movie.vote_average.toFixed(2);
  let voteClass = '';

  if (voteAverage >= 7) {
    voteClass = 'high-rating'; 
  } else if (voteAverage >= 6) {
    voteClass = 'medium-rating'; 
  } else {
    voteClass = 'low-rating'; 
  }

  const movieHTML = `
    <div class='movie'>
      <div class='image-div'>
        <button class='vote-avarage ${voteClass}'>${voteAverage}</button>
        <img class='movie-image' src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt='${movie.title}'/>
      </div>
      <div class='title-div'>
        <h1 class='movie-title'>${movie.title}</h1>
        <p>${movie.release_date}</p>
        <div class='icons'>
          <div class='tooltip'>
            <i class="fa-regular fa-heart favorite-btn" data-movie-id="${movie.id}"></i>
            <span class="tooltiptext">Add to favorites</span>
          </div>
          <div class='tooltip'>
            <i class="fa-solid fa-share share-button"></i>
            <span class="tooltiptext">Share</span>
          </div>
          <button class='watch' id="${movie.id}">WATCH</button>
        </div>
      </div>
    </div>`;
  container.insertAdjacentHTML("beforeend", movieHTML);
}


function attachMovieEventListeners(results) {
 
  document.querySelectorAll(".watch").forEach((btn) => {
    btn.addEventListener("click", function () {
      location.href = `movie.html?movieId=${this.id}`;
    });
  });


  document.querySelectorAll(".favorite-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const movieId = parseInt(this.dataset.movieId);
      const foundMovie = results.find(movie => movie.id === movieId);

      if (!foundMovie) return;

      const movieExistsInFavorites = favorites.some(movie => movie.id === movieId);
      if (movieExistsInFavorites) {
        alert("Already exists in favorites");
      } else {
        favorites.push(foundMovie);
        localStorage.setItem("favs", JSON.stringify(favorites));
        renderFavorites();
        alert(`${foundMovie.title} has been added to favorites`);
        openNav()
      }
    });
  });

  attachShareEventListeners(); 
}


function renderFavorites() {
  const sidenav = document.querySelector(".sidenav");
  sidenav.innerHTML = '';
  favorites.forEach((movie) => {
    const movieCard = `
      <div class="movie-fav">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
        <div>
          <button class="movie-btn watch" id="${movie.id}">WATCH</button>
          <button class="delete-btn" data-movie-id="${movie.id}">DELETE</button>
        </div>
      </div>`;
    sidenav.insertAdjacentHTML("beforeend", movieCard);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const movieId = parseInt(this.dataset.movieId);
      const movieIndex = favorites.findIndex(movie => movie.id === movieId);
      if (movieIndex > -1) {
        favorites.splice(movieIndex, 1);
        localStorage.setItem("favs", JSON.stringify(favorites));
        renderFavorites();
      }
    });
  });
}


function openNav() {
  document.querySelector(".favorites").style.visibility = 'visible';
}

async function genreFunction() {
  try {
    const { data: { genres } } = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    genres.forEach(genre => {
      const renderGenre = `<button class='genreBtn' data-index=${genre.id}>${genre.name}</button>`;
      document.querySelector('.genre').insertAdjacentHTML('beforeend', renderGenre);
    });

    document.querySelectorAll('.genreBtn').forEach((btn) => {
      btn.addEventListener('click', async function () {
        const genreId = this.getAttribute('data-index');
        urlNew = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_genres=${genreId}`;
        await getMovie();
      });
    });
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}


searchBtn.addEventListener('click', async function () {
  switchUrl(true);
  await getMovie();
});


document.querySelector('.favBtn').addEventListener('click', openNav);
document.querySelector('.close').addEventListener('click', function () {
  document.querySelector(".favorites").style.visibility = 'hidden';
});


getMovie();
renderFavorites();
genreFunction();


function attachShareEventListeners() {
  document.querySelectorAll(".share-button").forEach((btn) => {
    btn.addEventListener("click", async function () {
      const movieId = this.dataset.movieId;
      const movie = favorites.find(m => m.id === parseInt(movieId)) || await fetchMovieById(movieId);
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: movie.title,
            text: `Check out this movie: ${movie.title}`,
            url: `https://www.themoviedb.org/movie/${movie.id}`
          });
          console.log("Movie shared successfully!");
        } catch (error) {
          console.error("Error sharing movie:", error);
        }
      } else {
        const shareUrl = `https://www.themoviedb.org/movie/${movie.id}`;
        copyToClipboard(shareUrl);
        alert("Link copied to clipboard!");
      }
    });
  });
}


async function fetchMovieById(movieId) {
  try {
    const { data } = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}


function copyToClipboard(text) {
  const tempInput = document.createElement("input");
  document.body.appendChild(tempInput);
  tempInput.value = text;
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}







  