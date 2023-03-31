const apiKey = "e03b79c3fdc403674f7070702128c639";
let cityName = "Birmingham";
let stateCode = "AL"
let countryCode = "US" 
const limit = "1";



function geo(cityName) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`)
    .then((res) => {
        let result = res.json()
        return result;
    })
    .then((data) => {
        // console.log(data);
        let objD = data[0];
        let lat = objD.lat
        let lon = objD.lon
        // console.log(lon)
        latLon(lat, lon)
    })
}

function latLon(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then((res) => {
        let result = res.json()
        return result;
    })
    .then((data) => {
        console.log(data);
        let temp = data.main.temp
        // Add data.wind.speed, data.weather[0].main
        let iconId = data.weather[0].icon
        console.log(temp)
        let cityTitle = document.getElementById("cityTitle")
        let cityTemp = document.getElementById("cityTemp")
        let weatherIcon = document.getElementById("weatherIcon")
        cityTitle.textContent = data.name
        cityTemp.textContent = temp
        let iconUrl = `https://openweathermap.org/img/wn/${iconId}@4x.png`
        weatherIcon.src = iconUrl
    })
}
geo(cityName)