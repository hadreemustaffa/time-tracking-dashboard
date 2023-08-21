// fetch data from data.json
async function fetchData() {
	try {
		const response = await fetch('./data.json');
		return (data = await response.json());
	} catch (error) {
		console.log(error);
	}
}

// render cards using data return from json
async function renderCards() {
	let allData = await fetchData();
	let cardSection = '';

	allData.forEach((data) => {
		let card = `<div class="card activity">
      <div class="card-top activity ${data.title.toLowerCase()}">
        <img src=${data.icon} alt="">
      </div>
      <div class="card-bottom activity">
        <div class="activity-detail">
          <p class="activity-name" class="text-neutral-5">${data.title}</p>
          <button aria-label="edit" class="ellipsis">
            <img src="images/icon-ellipsis.svg" alt="">
          </button>
        </div>
        <div class="time-spent">
          <h1 class="text-neutral-5"><span class="current"></span>hrs</h1>
          <p><span class="selected-timeframe fs-secondary-body"></span> - <span class="previous"></span>hrs</p>
        </div>
      </div>
    </div>`;

		cardSection += card;
	});

	let cardsContainer = document.querySelector('.cards-container');
	cardsContainer.innerHTML = cardSection;

	// set data based on selected timeframe
	for (let i = 0; i < allData.length; i++) {
		const timeFrames = document.querySelectorAll('.timeframe');
		const current = document.querySelectorAll('.current');
		const previous = document.querySelectorAll('.previous');
		const selectedTimeframe = document.querySelectorAll('.selected-timeframe');

		function getDailyData() {
			current[i].innerHTML = allData[i].timeframes.daily.current;
			previous[i].innerHTML = allData[i].timeframes.daily.previous;
			selectedTimeframe[i].innerHTML = 'Yesterday';
		}
		function getWeeklyData() {
			current[i].innerHTML = allData[i].timeframes.weekly.current;
			previous[i].innerHTML = allData[i].timeframes.weekly.previous;
			selectedTimeframe[i].innerHTML = 'Last Week';
			timeFrames[1].classList.add('active');
		}
		function getMonthlyData() {
			current[i].innerHTML = allData[i].timeframes.monthly.current;
			previous[i].innerHTML = allData[i].timeframes.monthly.previous;
			selectedTimeframe[i].innerHTML = 'Last Month';
		}

		// set default active data on page load
		getWeeklyData();

		// add 'active' class to selected timeframe
		timeFrames.forEach((timeframe) => {
			timeframe.addEventListener('click', () => {
				document.querySelector('.active')?.classList.remove('active');
				timeframe.classList.add('active');
			});
		});

		// enable click to select timeframe
		timeFrames[0].addEventListener('click', () => {
			getDailyData();
		});
		timeFrames[1].addEventListener('click', () => {
			getWeeklyData();
		});
		timeFrames[2].addEventListener('click', () => {
			getMonthlyData();
		});
	}
}

renderCards();
