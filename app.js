//variables
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat:not(.reserved)");
const ticketAmount = document.querySelector("#count");
const total = document.querySelector("#total");
const movieInfoSection = document.querySelector(".movieInfo");
const form = document.querySelector(".form");
const movieInput = document.querySelector("#input");
const message = document.querySelector(".message");

//ticket price
let ticketPrice = 10;

//get datas from local storage
getLocalDatas();

//fetch
const fetchData = async () => {
  const movieTitle = movieInput.value.trim();
  const apiKey = "e0861d41";
  const url = `https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`;

  if (!movieTitle == "") {
    try {
      const responsive = await fetch(url);
      const data = await responsive.json();
      console.log(data);
      if (data.Response == "False") {
        return (
          (message.innerText = "There is no film with this name "),
          setTimeout(() => {
            message.innerText = "";
          }, 3000)
        );
      } else if (!responsive.ok) {
        throw new Error("There is an error here!!!");
      } else {
        getMovieInfo(data);
      }
    } catch (error) {
      alert(error);
    }
  } else {
    message.innerText = "Please enter a movie title";
    setTimeout(() => {
      message.innerText = "";
    }, 2000);
  }
};

// movie info

const getMovieInfo = (data) => {
  const Title = data.Title;
  const Year = data.Released;
  const Director = data.Director;
  const Plot = data.Plot;
  const Image = data.Poster;
  const time = data.Runtime;
  const Actors = data.Actors;
  const Country = data.Country;
  const Genre = data.Genre;
  const imdbRating = data.imdbRating;

  //create innerHTML
  movieInfoSection.innerHTML = `
    <div class="container container-fluid ">
    <article class="postcard light blue">
      <a class="postcard__img_link" href="#">
        <img style="width: 200px;" class="movieImg float-end " src="${Image}" alt="${Image}" />
      </a>
      <div class="postcard__text t-dark">
        <h1 class="postcard__title blue">${Title}</h1>
        <h4 class="postcard__title blue">${Director}</h4>
        <div class="postcard__subtitle small">
          <time >
            <i class="releasetime fas fa-calendar-alt mr-2"></i> ${Year}
          </time>
        </div>
        <div class="postcard__bar"></div>
        <div class="postcard__preview-txt"> ${Plot} </div>
        <div class="postcard__preview-txt">Actors: ${Actors} </div>
        <ul class="postcard__tagbox">
          <li class="genre"><i class="fas fa-tag mr-2"></i> Genre: ${Genre}</li>
          <li class="genre"><i class="fa-solid fa-earth-americas mr-2"></i> Country: ${Country}</li>
          <li class="genre"><i class="fa-regular fa-star mr-2"></i> Rating: ${imdbRating}</li>
          <li class="duration"><i class="fas fa-clock mr-2"></i> ${time}</li>
          <li class="tag__item play blue">
            <a href="https://www.imdb.com/find/?q=${Title}&ref_=nv_sr_sm"><i class="trailer fa-brands fa-imdb mr-2"></i>IMDB</a>
          </li>
        </ul>
      </div>
    </article>
  </div>
    `;
};

// submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  movieInput.focus();
  fetchData();
  form.reset();
});

// seat select event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("reserved")
  ) {
    e.target.classList.toggle("selected");
  }
  calculateSelectedSeats();
});

//update total and count
function calculateSelectedSeats() {
  const selectedSeats = document.querySelectorAll(".seats .seat.selected");

  const selectedIndex = [...selectedSeats].map(function (seat) {
    return [...seats].indexOf(seat);
  });

  //
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));

  const selectedSeatsCount = selectedSeats.length;
  ticketAmount.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}
//get data from local storage
function getLocalDatas() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));


  //change selected seats color
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

calculateSelectedSeats();
