
const main = document.querySelector('main')
const starting = document.querySelector('.starting')
const searchMVButton = document.querySelector('#search-btn')
clickedElements = [1, 4, 5]
 
searchMVButton.addEventListener('click', () => {
    const inputValue = document.querySelector('#input').value
    getMoviesList(inputValue)
})


const getMoviesList = async (searchTerm) => {
    
    if(searchTerm) {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8777769f`)
        const moviesData = await (response.json())
        const moviesIds = getMoviesIds(moviesData.Search)
        const movies = await Promise.all(moviesIds.map(searchById))
        const button = document.querySelector(".movie_text-button");

        starting.style.display = "none"
        showMovies(movies)
       
    } else {
        starting.style.display = "flex"
    }      
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

const saveArticleToLocalStorage = (articleElement) => {
    
    clickedElements.push(articleElement)
    localStorage.setItem('clickedMovies', clickedElements);

  
     console.log(localStoragegit)   
  }
  

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
                <button class="movie_text-button">
                    <img src="./plus_icon.png">
                    <span class="movie_text-select">WatchList</span>
                </button>                                          
                                                                
            </div>
            <p class="movie_text-summary">${movie.Plot}</p>
        </div>                    
    </div>
    
    `).join('')
     
    main.innerHTML = moviesList   

    const buttons = document.querySelectorAll(".movie_text-button");
    buttons.forEach(button => {
      button.addEventListener("click", (event) => {
        console.log("Button clicked");
        
        const currentArticle = event.target.closest('.article')
        if(currentArticle) {           
            saveArticleToLocalStorage(currentArticle);
        }           
      });      
    });

}
