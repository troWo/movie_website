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

async function similarMovie() {
    try {
        const {data} = await axios(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=95686a04581c305cc6d7e4ccff9d039a`)
        console.log(data.results);
        const all = data.results
  const similarMovies = document.querySelector('.similar-movies')
  all.forEach(el => {
    const similar = `
   
    <div class="movie-item">
    <h2>${el.title}</h2>
        
            <img src="${imagePrefix + el.poster_path}" alt="">
    
    </div>`
similarMovies.insertAdjacentHTML("beforeend", similar);
  });
       
    } catch (error) {
        console.log(error);
    }
  }
  similarMovie()


const iframe = document.querySelector('iframe')


const urlTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=95686a04581c305cc6d7e4ccff9d039a`
const youtubeVideo = `https://www.youtube.com/embed/`

  async function movieTrailer(){
    try {
        const {data} = await axios(urlTrailer)
        const findTrailer = data.results[0]
        console.log(movieId);
         
        let link = youtubeVideo + findTrailer.key
        iframe.src = link;
        console.log(link);
    } catch (error) {
        
    }
  }
  movieTrailer()




