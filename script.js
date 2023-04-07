const apiKey = "e03b79c3fdc403674f7070702128c639";
let cityName = "";
let stateCode = "AL";
let countryCode = "US" 
const limit = "1";

let ul = document.getElementById("recentSrchs")
const searchArr = [];

let cityTitle = document.getElementById("cityTitle")
let cityTemp = document.getElementById("cityTemp")
let weatherIcon = document.getElementById("weatherIcon")
let formEl = document.getElementById("weatherForm")
let cityVal = document.getElementById("cityInput")
let stateVal = document.getElementById("stateInput").value
formEl.addEventListener("submit", (e)=>{
    e.preventDefault()
    cityName = cityVal.value
    console.log(cityName)
    cityListPop()
    geo(cityName) 
})

function getRecentSrc() {
    let recentSrchs = JSON.parse(localStorage.getItem("recent-search"))
    console.log(recentSrchs)
    for (let i = 0; i < recentSrchs.length; i++){
        if (recentSrchs.indexOf(cityName)=== -1){
            let li = document.createElement("li")
            li.addEventListener("click", (cityName)=>{
                cityName = this.textContent
                cityListPop()
                geo(cityName)
            })
            ul.append(li)
            searchArr.push(recentSrchs[i])
        }
    }
}

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
        localStorage.setItem("cityName", cityName)
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
        let windSp = data.wind.speed
        let weatherMain = data.weather[0].main
        let iconId = data.weather[0].icon
        console.log(temp)
        cityTitle.textContent = data.name
        cityTemp.textContent = temp
        windSp.textContent = windSp
        weatherMain.textContent = weatherMain
        let iconUrl = `https://openweathermap.org/img/wn/${iconId}@4x.png`
        weatherIcon.src = iconUrl
    })
}

function cityListPop() {
    cityTitle.textContent = cityName
if (searchArr.indexOf(cityName)=== -1){
    let li = document.createElement("li")
    li.textContent = cityName
    li.addEventListener("click", ()=>{
        geo(cityName)
    })
    ul.append(li)
    searchArr.push(cityName)
    localStorage.setItem("recent-search", JSON.stringify(searchArr))
}
}

geo(cityName)
getRecentSrc()