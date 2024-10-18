const apiKey = "94710dbf3e97846c6b959f9714538145";
const urlNew = `https://api.themoviedb.org/3/discover/movie?api_key=`;

const joined = urlNew + apiKey;
//console.log(joined);

const favorites = JSON.parse(localStorage.getItem("favs")) || [];

const container = document.querySelector(".container");

async function getMovie() {
  try {
    const {
      data: { results },
    } = await axios(urlNew + apiKey);
    results.forEach((movie) => {
      const displayMovies = `
      <div class='movie'>
      <div class='image-div'>
      <button class='vote-avarage'>${movie.vote_average.toFixed(2)}</button>
      <img class='movie-image' src='https://image.tmdb.org/t/p/w500/${
        movie.poster_path
      }'/>
      </div>
      <div class=title-div>
      
      <h1 class='movie-title'> ${movie.title}</h1>
      
      <p>${movie.release_date}</p>
      <div class='icons'>
      <div class='tooltip'>
      <i class="fa-regular fa-heart favorite-btn"  data-movie-id=${movie.id}></i>
      <span class="tooltiptext">Add to favorites</span>
      </div>
      <div class='tooltip'>
      <i class="fa-solid fa-share share-button"></i>
      <span class="tooltiptext">Share</span>
      </div>
      <button class='watch' id="${movie.id}">WATCH</button>
      </div>
      </div>
      </div>  
`;
      container.insertAdjacentHTML("beforeend", displayMovies);
    });


    const btns = document.querySelectorAll(".watch");
    btns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // console.log(this.id);
        location.href = `movie.html?movieId=${this.id}`;
      });
    });

    // console.log(results);

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



        const shareButtons = document.querySelectorAll('.share-button');

        // Add click event listener to each button
        shareButtons.forEach(button => {
           button.addEventListener('click', () => {
              // Get the URL of the current page
              console.log('click');
              const url = window.location.href;
        
              // Get the social media platform from the button's class name
              const platform = button.classList[1];
        
              // Set the URL to share based on the social media platform
              let shareUrl;
              switch (platform) {
                 case 'facebook':
                 shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                 break;
                 case 'twitter':
                 shareUrl = `https://twitter.com/share?url=${encodeURIComponent(url)}`;
                 break;
                 case 'linkedin':
                 shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}`;
                 break;
                 case 'pinterest':
                 shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}`;
                 break;
                 case 'reddit':
                 shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}`;
                 break;
                 case 'whatsapp':
                 shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
                 break;
              }
        
              // Open a new window to share the URL
              window.open(shareUrl, '_blank');
           });
        });


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
        <button class="favorite-btn watch" data-movie-id="${movie.id}">DELETE</button>
      </div>
      </div>
    `;
    sidenav.insertAdjacentHTML("beforeend", movieCard);
  });
}

getMovie();
renderFavorites();

function openNav() {
  // document.querySelector(".favorites").style.height = "300px";
  document.querySelector(".favorites").style.visibility = 'visible'
}

document.querySelector('.close').addEventListener('click', function(){
  document.querySelector(".favorites").style.visibility = 'hidden'
})

document.querySelector('.favBtn').addEventListener('click', function(){
  document.querySelector(".favorites").style.visibility = 'visible'
})
// function closeNav() {
//   document.querySelector(".favorites").style.visibility = 'hidden'
// }

// movie list functionality
// search functionality
// filtering by genres (optional)
// go to the specific movie page
// show movie information (cast, title etc.)
// show the trailer (optional)


const searchInput = document.getElementById('searchInput')


const searchBtn = document.querySelector('.searchBtn')
const found = document.querySelector('.found')
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key='

searchBtn.addEventListener('click', async function(){
  
  try {
    const {
      data: { results },
    }= await axios(searchUrl + apiKey + '&query=' + searchInput.value +'&page=1')
    
    console.log(results);
    console.log(searchInput.value);
    getProduct()
  } catch (error) { 
  } 

})