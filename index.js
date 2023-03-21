
const searchPage = document.querySelector('#search-page')
const starting = document.querySelector('.starting')
const tryAgain = document.querySelector('.try-again')
const empty = document.querySelector('.empty')
const searchMVButton = document.querySelector('#search-btn')
const clickedElements = []
const navButton = document.querySelector('#nav-btn')
const watchPage = document.querySelector('#watch-page')
const article = document.querySelector('.article')
 
if(searchMVButton) {
    searchMVButton.addEventListener('click', () => {
        const inputValue = document.querySelector('#input').value
        getMoviesList(inputValue)
    })
}

// const getMoviesList = async (searchTerm) => {
    
//     if(searchTerm) {
//         const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8777769f`)
//         const moviesData = await (response.json())
//         console.log(moviesData)
//         if(moviesData.Response) {
//             starting.style.display = "none"
//             tryAgain.style.display= "flex"
            
//         } else {
//             const moviesIds = getMoviesIds(moviesData.Search)
//             const movies = await Promise.all(moviesIds.map(searchById))
//             const button = document.querySelector(".movie_text-button");
//             starting.style.display = "none"
//             showMovies(movies)
//         }
               
//     } else {
//         starting.style.display = "flex"
       
//     }      
// }

 const getMoviesList = async (searchTerm) => {
    
        if(searchTerm) {
            const response = await fetch(`http://www.omdbapi.com/?s=${searchTerm}&apikey=8777769f`)
            const moviesData = await (response.json())
            console.log(moviesData)
            if(moviesData.Search) {
                const moviesIds = getMoviesIds(moviesData.Search)
                const movies = await Promise.all(moviesIds.map(searchById))
                const button = document.querySelector(".movie_text-button");
                starting.style.display = "none"
                showMovies(movies)
            } else {
                starting.style.display = "none"
                tryAgain.style.display= "flex"
            }
                   
        } else {
            starting.style.display = "flex"
           
        }      
    }
    
    
    


// if(moviesData.Response) {
//     if (moviesData.Search) {
//       const moviesIds = getMoviesIds(moviesData.Search)
//       const movies = await Promise.all(moviesIds.map(searchById))
//       const button = document.querySelector(".movie_text-button");
//       starting.style.display = "none"
//       showMovies(movies)
//     } else {
//       starting.style.display = "none"
//       tryAgain.style.display= "block"
//     }
//   } else {
//     starting.style.display = "none"
//     tryAgain.style.display= "block"
//   }

const getMoviesIds = (arr) => {
    // if(arr && arr.length !== 0) {
    //     const moviesIds = arr.map(movie => movie.imdbID)
    //     return moviesIds  
    // }
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
            empty.style.display = "none"                   
            watchPage.innerHTML = savedMovies       
        })
    } else {
        empty.style.display = "flex"
    }  
    
}





