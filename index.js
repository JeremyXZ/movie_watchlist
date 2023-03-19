
const main = document.querySelector('main')

const getMoviesList = async (searchTerm) => {
    
    const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8777769f`)
    const moviesData = await (response.json())
    console.log(moviesData.Search)
    const moviesIds = getMoviesIds(moviesData.Search)
    console.log(moviesIds)
    const movies = await Promise.all(moviesIds.map(searchById))
    console.log(movies)
    showMovies(movies)
  
}

const getMoviesIds = (arr) => {
    const moviesIds = arr.map(movie => movie.imdbID)
    return moviesIds    
}




const searchById = async (id) => {
    const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=8777769f`)
    const data = await (response.json())
    return data
}

getMoviesList("blade runner")


const showMovies = (movies) => {
   const moviesList =  movies.map(movie => `
    <div class="article">
        <div class="movie_image">
             <img class="movie_image-item" src="${movie.Poster}">
        </div>
        <div class="movie_text">
            <div class="movie_text-title">
                <span class="movie_text-name">${movie.Title}</span> 
                <span class="movie_text-star"><img src="./star-icon.png"></span>
                <span class="movie_text-rating">${movie.Ratings[0].Value}</span>                       
            </div>
            <div class="movie_text-info">
                <div class="movie_text-time">${movie.Runtime}</div>
                <div class="movie_text-genre">${movie.Genre}</div>
                <div class="movie_text-icon">
                <img src="./plus_icon.png"> 
                <a class="movie_text-select">WatchList</a>                                
                </div>                                                 
            </div>
            <p class="movie_text-summary">${movie.Plot}</p>
        </div>                    
    </div>
    
    `).join('')

    main.innerHTML = moviesList

}

getMovies('blade runner')