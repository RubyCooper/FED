window.onresize = checkCeilingImageSize;

var likeButton = document.querySelector('body > ul:nth-of-type(3) li label input');
var posterButton = document.querySelector('body > ul:nth-of-type(3) li a:nth-of-type(1) img');
var infoButton = document.querySelector('body > ul:nth-of-type(3) li a:nth-of-type(2) img');
var trailerButton = document.querySelector('body > ul:nth-of-type(3) li a:nth-of-type(3) img');

var likeToggle = document.querySelector('body > ul:nth-of-type(2) li label input');
var backButton = document.querySelector('ul:nth-of-type(2) > li a:nth-of-type(1)');
var nextButton = document.querySelector('ul:nth-of-type(2) > li a:nth-of-type(2)');
var moviePosters = document.querySelectorAll('body > ul:nth-of-type(1) > li');

var currentWindowWidth;
var currentPage = 1;
var selectedPage;

var likedMovies = [false, false, false, false, false, false, false, false, false, false];
var likedMoviesArray = [];

var currentArrayPosition = 0;
var arrayPlaceToDelete;

var isItLiked;
var onlyLikedMoviesVisible = false;

var currentMovieIndex = 0;
var arrayPositionValue = likedMoviesArray[currentArrayPosition];

var mediaQuery = window.matchMedia("(min-width: 850px)")



var body = document.querySelector('body');



// /////////////////
// resize screen: //
// /////////////////

function checkCeilingImageSize(){
    
    var ceilingImageHeight = document.querySelector('div:nth-of-type(1) img:nth-of-type(2)').clientHeight;
    var seatImageHeight = document.querySelector('div:nth-of-type(2) img:nth-of-type(1)').clientHeight;
    var windowWidth = document.querySelector('body > ul:nth-of-type(1)').clientWidth;
    var windowWidthAndGap = Number(windowWidth) + 16;


    document.documentElement.style.setProperty('--ceilingImageHeight', ceilingImageHeight + 'px');
    document.documentElement.style.setProperty('--seatImageHeight', seatImageHeight + 'px');
    document.documentElement.style.setProperty('--windowWidth', '-' + currentWindowWidth + 'px');
   
    currentWindowWidth = windowWidthAndGap;
    defaultBigScreen(mediaQuery);
}


// //////////////////
// EventListeners: //
// //////////////////

posterButton.addEventListener("click", () => {
    selectedPage = 1;
    pageSelector(selectedPage);
    currentPage = 1;
});

infoButton.addEventListener("click", () => {
    selectedPage = 2;
    pageSelector(selectedPage);
    currentPage = 2;
});

trailerButton.addEventListener("click", () => {
    selectedPage = 3;
    pageSelector(selectedPage);
    currentPage = 3;

});

likeButton.addEventListener("click", () => {
    like();
});

backButton.addEventListener("click", () => {
    navigateMovies('back');
});

nextButton.addEventListener("click", () => {
    navigateMovies('next');
});

body.addEventListener("keydown", (event) => {
    if (event.isComposing || event.keyCode === 229) {
      return;
    }
   
    var keyPressed = event.key;
    navigateMovies(keyPressed);
});

likeToggle.addEventListener("click", () => {

    if (likedMoviesArray.length <= 0) {
        likeToggle.checked = false;
        alert('Voeg films toe aan je favorieten om ze te kunnen bekijken!');
    }

    if(likeToggle.checked == true && likedMoviesArray.length > 0) {
        onlyLikedMoviesVisible = true;
        moviePosters[currentMovieIndex].style.display = 'none';
        currentArrayPosition = 0;

        arrayPositionValue = likedMoviesArray[currentArrayPosition];
        moviePosters[arrayPositionValue].style.display = 'flex';
    }

    if(likeToggle.checked == false) {
        onlyLikedMoviesVisible = false;

        currentArrayPosition = 0;
        arrayPositionValue = likedMoviesArray[currentArrayPosition];
        moviePosters[arrayPositionValue].style.display = 'none';
        moviePosters[currentMovieIndex].style.display = 'flex'; 
    }
});


// /////////////
// functions: //
// /////////////

function pageSelector(){

    if(selectedPage == currentPage){
        return;
    }

    else {
        var amountOfPages =  currentPage - selectedPage;
        var currentTransfrormPercentage = getComputedStyle(document.documentElement).getPropertyValue('--percentage');
        var currentTransformNumber = parseInt(currentTransfrormPercentage);
        var newTransformValue = 100 * amountOfPages + currentTransformNumber;

        document.documentElement.style.setProperty('--percentage', newTransformValue + '%');
    }

}



function like(){
  
    if (likeButton.checked == true){
        likedMovies[currentMovieIndex] = true;
        likedMoviesArray[likedMoviesArray.length] = currentMovieIndex;
    }

    else if (likeButton.checked == false){
        arrayPlaceToDelete = likedMoviesArray.indexOf(currentMovieIndex);
        likedMovies[currentMovieIndex] = false;
        
        deleteArrayValue();
    }
    sortArray();  
}


function deleteArrayValue() {
    likedMoviesArray.splice(arrayPlaceToDelete, 1);
}

function sortArray(){
    likedMoviesArray.sort((a,b) => a-b);  
}

function updateLikedButton(){
    if (likedMovies[currentMovieIndex] == true){
        likeButton.checked = true;
    }

    if (likedMovies[currentMovieIndex] == false){
        likeButton.checked = false;
    }
}


moviePosters[currentMovieIndex].style.display = 'flex';

function navigateMovies(direction) {
    
    if (onlyLikedMoviesVisible == false) {

        if (direction == 'back' || direction == 'ArrowLeft')  {

            moviePosters[currentMovieIndex].style.display = 'none';
            currentMovieIndex--;
    
            if(currentMovieIndex < 0) {
                currentMovieIndex = 9;
            }
        
            moviePosters[currentMovieIndex].style.display = 'flex';
            isItLiked = moviePosters[currentMovieIndex].classList.contains("liked");

            updateLikedButton();
        }
        
        if (direction == 'next'|| direction == 'ArrowRight') {
    
            moviePosters[currentMovieIndex].style.display = 'none';
            currentMovieIndex++;
            
            if(currentMovieIndex > 9) {
                currentMovieIndex = 0;
            }
           
            moviePosters[currentMovieIndex].style.display = 'flex';
            isItLiked = moviePosters[currentMovieIndex].classList.contains("liked");

            updateLikedButton();
        }
    }


    if (likeToggle.checked == true && likedMoviesArray.length >= 1) {
        
        if (direction == 'back' || direction == 'ArrowLeft')  {
         
            moviePosters[arrayPositionValue].style.display = 'none';
        
            currentArrayPosition--;

            if (currentArrayPosition < 0) {
                currentArrayPosition = likedMoviesArray.length - 1;
            }
            
            arrayPositionValue = likedMoviesArray[currentArrayPosition];
            moviePosters[arrayPositionValue].style.display = 'flex';
        }
        
        if (direction == 'next'|| direction == 'ArrowRight') {

            moviePosters[arrayPositionValue].style.display = 'none';
            currentArrayPosition++;
            
            if (currentArrayPosition > likedMoviesArray.length -1) {
                currentArrayPosition = 0;
            }
            
            arrayPositionValue = likedMoviesArray[currentArrayPosition];
            moviePosters[arrayPositionValue].style.display = 'flex';
        }
    }
    likedMoviesArray.sort(function(a, b){return a-b});
    updateLikedButton();
}


function defaultBigScreen(mediaQuery) {
    if (mediaQuery.matches) { 
        selectedPage = 2;
        pageSelector(selectedPage);
        currentPage = 2;
        
    } else {
      
    }
  }



checkCeilingImageSize();
defaultBigScreen(mediaQuery);

