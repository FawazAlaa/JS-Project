
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTAzNTNhNmIyZmU1NWI4ZTYzZWY5NTAwNmVkM2QxMyIsIm5iZiI6MTc0NjE4MzIyNS4xNjMsInN1YiI6IjY4MTRhNDM5MDliZTgzNjVmOGY0MDZhNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k84MufP7CvsFgQe4y66LwZzGJm386Y1AdVbkvqYOotY'
    }
}

let bigArrayList = []

async function getmovielist(content = 'now_playing') {
    let movielist = await fetch(`https://api.themoviedb.org/3/movie/${content}?language=en-US&page=1`, options)
    try {
        let list = await movielist.json();
        bigArrayList = list.results;

        displaydata(bigArrayList);

    }
    catch (error) {
        console.error('Error is :', error)

    }
}

getmovielist()

//mar7la creating el elements
function displaydata(arraylist) {
    let container = document.getElementById('movielist__cards');
    container.innerHTML = '';
    arraylist.forEach((item, index) => {

        let div = document.createElement('div');
        div.classList.add('card');

        let title = document.createElement('h3');
        title.innerHTML = item.original_title;
        div.appendChild(title);

        let image = document.createElement('img');
        image.src = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
        div.appendChild(image);

        let showmorebtn = document.createElement('button');
        showmorebtn.classList.add('showmorebtn');
        showmorebtn.innerHTML = 'Show More Details &#9660';  //&#9650
        showmorebtn.setAttribute('data-index', index);
        div.appendChild(showmorebtn);



        let overViewDesc = document.createElement('div');
        overViewDesc.classList.add('atshowmore')

        let overView = document.createElement('p');
        overView.innerHTML = item.overview;
        overViewDesc.appendChild(overView);

        let popularity = document.createElement('p');
        popularity.innerHTML = 'Number of watches: ' + item.popularity;
        overViewDesc.appendChild(popularity);

        let releaseDate = document.createElement('p');
        releaseDate.innerHTML = 'Release Date: ' + item.release_date;
        overViewDesc.appendChild(releaseDate);

        div.appendChild(overViewDesc);


        container.appendChild(div);


        showmorebtn.addEventListener('click', function () {
            let card = showmorebtn.parentElement;           //badl // let content = showmorebtn.nextElementSibling;
            let content = card.querySelector('.atshowmore');

            if (content.style.display === "none") {
                content.style.display = "block";
                showmorebtn.innerHTML = "Show Less &#9650";
            } else {
                content.style.display = "none";
                showmorebtn.innerHTML = "Show More Details &#9660";
            }
        });

    });


}


let listbtns = document.getElementById('listbtns')
console.log(listbtns);
listbtns.addEventListener('click', function (e) {
    console.log(e);
    if (e.target && e.target.nodeName === 'LI') {
        var text = e.target.textContent;
        if (text == 'Now playing') {
            getmovielist(content = 'now_playing')
        }
        else if (text == 'Popular') {
            getmovielist(content = 'popular')

        }
        else if (text == 'Top rated') {
            getmovielist(content = 'top_rated')

        }
        else if (text == 'Upcoming') {
            getmovielist(content = 'upcoming')

        }

    }

});

//    Search BAR
let errorMsg = document.getElementById("searcherror");
let userSearch = document.getElementById('searchtext');
userSearch.addEventListener('input', function () {
    let searchText = this.value.trim().toLowerCase();
    let filteredMovies = bigArrayList.filter(item => {
        return item.original_title.toLowerCase().includes(searchText);
    });
    if (filteredMovies.length === 0) {
        errorMsg.textContent = " No matching movies found.";
    } else {
        errorMsg.textContent = ""; 
    }
 displaydata(filteredMovies);

});

//  allMoviesContainer=document.getElementById('movielist__cards').addEventListener('click',function(e){
//      console.log(allMoviesContainer)
//     console.log(e);
//  });

//  allMoviesContainer.forEach((item) => {     
//  item.addEventListener('click',function(e){
//      console.log(allMoviesContainer)
//     console.log(e);
//  });
    // });
















