
const searchPage = document.querySelector('#search-page')
const startingEl = document.querySelector('.starting')
const tryAgainEl = document.querySelector('.try-again')
const emptyEl = document.querySelector('.empty')
const searchMVButton = document.querySelector('#search-btn')
const clickedElements = []
const navButton = document.querySelector('#nav-btn')
const watchPage = document.querySelector('#watch-page')

 
if(searchMVButton) {
    searchMVButton.addEventListener('click', () => {
        const inputValue = document.querySelector('#input').value
        getMoviesList(inputValue)
    })
}
const getMoviesList = async (searchTerm) => {
    
        if(searchTerm) {
            const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8777769f`)
            const moviesData = await (response.json())
            console.log(moviesData)
            if(moviesData.Search) {
                const moviesIds = getMoviesIds(moviesData.Search)
                const movies = await Promise.all(moviesIds.map(searchById))
                const button = document.querySelector(".movie_text-button");
                startingEl.style.display = "none"
                showMovies(movies)
            } else {
                startingEl.style.display = "none"
                tryAgainEl.style.display= "flex"
            }
                   
        } else {
            startingEl.style.display = "flex"
           
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
    localStorage.setItem('clickedMovies', JSON.stringify(clickedElements));
  
    console.log({localStorage}, {clickedElements})        
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
     
    searchPage.innerHTML = moviesList   

    const buttons = document.querySelectorAll(".movie_text-button");
    buttons.forEach(button => {
      button.addEventListener("click", (event) => {
        console.log("Button clicked");
        
        const currentArticle = event.target.closest('.article')
        if(currentArticle) {           
            saveArticleToLocalStorage(currentArticle.outerHTML);
        }           
      });      
    });

}

const moveNextPage = () => {
    window.location.href = 'watchlist.html'     
}

if(watchPage) {
    if(localStorage.getItem('clickedMovies')) {
       
        window.addEventListener('load', () => {
            const savedMovies = JSON.parse(localStorage.getItem('clickedMovies'))
            emptyEl.style.display = "none"                   
            watchPage.innerHTML = savedMovies       
        })
    } else {
        emptyEl.style.display = "flex"
    }      
}





