const container = document.querySelector(".container")
const seats = document.querySelectorAll(".seat:not(.reserved)")
const ticketAmount = document.querySelector("#count")
const total = document.querySelector("#total")
const movieSelector= document.querySelector('#movie')

let ticketPrice = parseInt(movieSelector.value)

getDatas()

container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seat") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected")

    }
    calculateSelectedSeats ()
})

function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setITem("selectedMoviePrice", moviePrice)
}


//update total and count
function calculateSelectedSeats(){
    const selectedSeats = document.querySelectorAll(".seats .seat.selected")

    const selectedIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat)
    })

localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex))

    const selectedSeatsCount = selectedSeats.length;
    ticketAmount.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice
}
//get data from local storage
function getDatas(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex != null){
        movieSelector.selectedIndex = selectedMovieIndex
    }
}


//movie select event
movieSelector.addEventListener("change", e =>{
    ticketPrice = parseInt(e.target.value);

    // setMovieData()
    calculateSelectedSeats();
})


calculateSelectedSeats()