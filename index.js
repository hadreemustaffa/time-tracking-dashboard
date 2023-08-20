const activityName = document.querySelectorAll('.activity-name');
const current = document.querySelectorAll('.current');
const previous = document.querySelectorAll('.previous');
const selectedPeriod = document.querySelectorAll('.selected-period');
const timePeriods = document.querySelectorAll('.time-period');

async function fetchData() {
	const response = await fetch('./data.json');
	const data = await response.json();
	console.log(data);

	for (let i = 0; i < data.length; i++) {
		activityName[i].innerHTML = data[i].title;

		function getDailyData() {
			current[i].innerHTML = data[i].timeframes.daily.current;
			previous[i].innerHTML = data[i].timeframes.daily.previous;
			selectedPeriod[i].innerHTML = 'Yesterday';
		}
		function getWeeklyData() {
			previous[i].innerHTML = data[i].timeframes.weekly.previous;
			current[i].innerHTML = data[i].timeframes.weekly.current;
			selectedPeriod[i].innerHTML = 'Last Week';
		}
		function getMonthlyData() {
			current[i].innerHTML = data[i].timeframes.monthly.current;
			previous[i].innerHTML = data[i].timeframes.monthly.previous;
			selectedPeriod[i].innerHTML = 'Last Month';
		}

		// default on page load
		getWeeklyData();

		timePeriods[0].addEventListener('click', () => {
			getDailyData();
		});
		timePeriods[1].addEventListener('click', () => {
			getWeeklyData();
		});
		timePeriods[2].addEventListener('click', () => {
			getMonthlyData();
		});
	}
}

fetchData();
