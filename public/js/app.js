const form = document.getElementById('weather-form');
const weatherDataDiv = document.getElementById('weather-data');
const weatherChartCanvas = document.getElementById('weather-chart').getContext('2d');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city').value;

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
        displayWeatherData(data);
        displayWeatherChart(data);
    } catch (error) {
        weatherDataDiv.innerHTML = `<p>Error fetching weather data</p>`;
    }
});

function displayWeatherData(data) {
    weatherDataDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}

function displayWeatherChart(data) {
    const chart = new Chart(weatherChartCanvas, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'Humidity'],
            datasets: [{
                label: `Weather in ${data.name}`,
                data: [data.main.temp, data.main.humidity],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
