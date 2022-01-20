// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    // when we will press keycode 13 , means 'enter' then it will show the place name
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        // giving the city parameter to the getWeatherReport function
        getWeatherReport(searchInputBox.value);
        /* at firs body will be hidden, after entering city and getting data, it will show  */
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
// we are typing city name , so we have to give city parameter to the function
function getWeatherReport(city) {
    // &units=metric --> to convert F to C
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        // api call will return a .json file
        return weather.json();
        // if api call is successful, call the showWeatherReport function to show
    }).then(showWeatherReport);
}

// Show Weather Report
function showWeatherReport(weather){

    // before accessing every id , only print the weather in json format in the console
    // and check the actual name of data

    console.log(weather);

    // here, getting every id by getElementById and
    // changing the innertext / innerhtml to show real data there

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    // new date is a js inbuild function to get current date's every details
    let todayDate = new Date();
    // we are calling  dateManage function to get the particular things we want
    date.innerText = dateManage(todayDate);

    
    // here we are changing the background according to weather type
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 
}

// Date manage
// dateArg --> newDate()
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // every functions are inbuild js function to get year month date day
    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}


