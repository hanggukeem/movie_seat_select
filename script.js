'use strict';

const container = document.querySelector(".seatContainer");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populate();


let ticketPrice = +movieSelect.value;

//영화제목,가격 값 저장
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectecMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}


// 총 가격과 자리수 계산
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
 const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

}


//localStorage에있는 데이터 받아오기

function populate() {
   const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
	}

// 영화선택
movieSelect.addEventListener("change", e => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

//좌석선택
container.addEventListener("click", e=> {
	if (
		e.target.classList.contains("seat") && !e.target.classList.contains("occupied")
	) {
		e.target.classList.toggle("selected");
		updateSelectedCount();
	}
});


updateSelectedCount();


