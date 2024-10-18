const apiKey = "94710dbf3e97846c6b959f9714538145";
let urlNew = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
const searchInput = document.getElementById('searchInput');
const searchBtn = document.querySelector('.searchBtn');

const favorites = JSON.parse(localStorage.getItem("favs")) || [];
const container = document.querySelector(".container");

// Function to switch between URLs
function switchUrl(switchPage) {
  if (switchPage) {
    urlNew = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchInput.value)}&page=1`;
  } else {
    urlNew = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  }
}

async function getMovie() {
  try {
    const { data: { results } } = await axios(urlNew);
    
    container.innerHTML = '';
    results.forEach((movie) => {
      const displayMovies = `
      <div class='movie'>
        <div class='image-div'>
          <button class='vote-avarage'>${movie.vote_average.toFixed(2)}</button>
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
      
      container.insertAdjacentHTML("beforeend", displayMovies);
    });
    const btns = document.querySelectorAll(".watch");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        location.href = `movie.html?movieId=${this.id}`;
      });
    });
    const favBtns = document.querySelectorAll(".favorite-btn");
    favBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        openNav();
        const foundMovie = results.find(
          // TODO: use triple equal or strict equality
          (movie) => movie.id == this.dataset.movieId
        );
        if (favorites.find((m) => m.id === foundMovie.id)) {
          alert("already exist");
        } else {
          favorites.push(foundMovie);
        }

        localStorage.setItem("favs", JSON.stringify(favorites));
        renderFavorites();
      });
    });
  } catch (error) {
    console.log(error);
  }
}


function renderFavorites() {
  const favoritesContainer = document.querySelector(".favorites");
  const sidenav = document.querySelector(".sidenav");
  sidenav.innerHTML = "";
  favorites.forEach((movie) => {
    const movieCard = `
      <div class="movie-fav">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
      <div>
        <button class="movie-btn watch" id="${movie.id}">WATCH</button>
        <button class="delete-btn" data-movie-id="${movie.id}">DELETE</button>
      </div>
      </div>
    `;
    sidenav.insertAdjacentHTML("beforeend", movieCard);

const deleteBtn = document.querySelectorAll('.delete-btn')
deleteBtn.forEach(btn => {
  btn.addEventListener('click', function (){
    try {
      const movieId = this.getAttribute('data-movie-id');
      const movieIndex = favorites.findIndex(movie => movie.id === parseInt(movieId));
      
      if (movieIndex > -1) {
        favorites.splice(movieIndex, 1);  // Remove the movie from the array
        localStorage.setItem("favs", JSON.stringify(favorites));  // Update localStorage
        renderFavorites();  // Re-render the updated list
      }
    } catch (error) {
      
    }
  })
})

  });
}

getMovie();
renderFavorites();

function openNav() {
  document.querySelector(".favorites").style.visibility = 'visible'
}

document.querySelector('.close').addEventListener('click', function(){
  document.querySelector(".favorites").style.visibility = 'hidden'
})

document.querySelector('.favBtn').addEventListener('click', function(){
  document.querySelector(".favorites").style.visibility = 'visible'
})


searchBtn.addEventListener('click', async function() {
  switchPage = true;
  switchUrl(switchPage);

  try {
    await getMovie();
  } catch (error) {
    console.error(error);
  }
});

const genre = document.querySelector('.genre')

async function genreFunction() {
  try {
    const { data } = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
    const namesGenres = data.genres;
    
    namesGenres.forEach(el => {
      const renderGenre = `
        <button class='genreBtn' data-index=${el.id}>
          ${el.name}
        </button>
      `;
      genre.insertAdjacentHTML('beforeend', renderGenre);
    });

    const genreBtns = document.querySelectorAll('.genreBtn');
    genreBtns.forEach((btn) => {
      btn.addEventListener('click', async function() {
        const genreId = this.getAttribute('data-index');
        const { data } = await axios(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_genres=${genreId}`);
        
        container.innerHTML = ''; 
        
        data.results.forEach((movie) => {
          const displayMovies = `
          <div class='movie'>
            <div class='image-div'>
              <button class='vote-avarage'>${movie.vote_average.toFixed(2)}</button>
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
          
          container.insertAdjacentHTML("beforeend", displayMovies);
        });
        
        attachMovieEventListeners(data.results);
      });
    });

  } catch (error) {
    console.log(error);
  }
}
genreFunction()

// Function to render a single movie
// function renderMovie(movie) {
//   const voteAverage = movie.vote_average.toFixed(2);
//   let voteClass = '';

//   if (voteAverage >= 8) {
//     voteClass = 'high-rating'; // High rating (8-10)
//   } else if (voteAverage >= 7) {
//     voteClass = 'medium-rating'; // Medium rating (7-7.9)
//   } else {
//     voteClass = 'low-rating'; // Low rating (below 7)
//   }

//   const movieHTML = `
//     <div class='movie'>
//       <div class='image-div'>
//         <button class='vote-avarage ${voteClass}'>${voteAverage}</button>
//         <img class='movie-image' src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt='${movie.title}'/>
//       </div>
//       <div class='title-div'>
//         <h1 class='movie-title'>${movie.title}</h1>
//         <p>${movie.release_date}</p>
//         <div class='icons'>
//           <div class='tooltip'>
//             <i class="fa-regular fa-heart favorite-btn" data-movie-id="${movie.id}"></i>
//             <span class="tooltiptext">Add to favorites</span>
//           </div>
//           <div class='tooltip'>
//             <i class="fa-solid fa-share share-button" data-movie-id="${movie.id}"></i>
//             <span class="tooltiptext">Share</span>
//           </div>
//           <button class='watch' id="${movie.id}">WATCH</button>
//         </div>
//       </div>
//     </div>`;
//   container.insertAdjacentHTML("beforeend", movieHTML);
// }