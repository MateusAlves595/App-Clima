const apiKey = "7f60136f508411a7546cc2edba77fefd";
const apiUnsplash = "https://source.unsplash.com/1600x900/?"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector("#weather-data")
const errorContainer = document.querySelector("#error-message")
const loader = document.querySelector("#loader")

const suggestionsContainer = document.querySelector("#suggestions")
const suggestionsButtons = document.querySelectorAll("#suggestions button")

//Functions
const toggleLoader = () => {
    loader.classList.toggle("hide")
}

const getWeatherData = async(city) => {
    toggleLoader()
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
    
    const res = await fetch(apiWeatherUrl)
    const data = await res.json()
    toggleLoader()

   return data
}

const showErrorMessage = () => {
    errorContainer.classList.remove("hide")
}

const hideInformation = () => {
    errorContainer.classList.add("hide")
    weatherContainer.classList.add("hide")

    suggestionsContainer.classList.add("hide")
}

const changeBackground = async (city) => {
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`
}

const showWeatherData = async (city) => {
    hideInformation()
    const data = await getWeatherData(city)
    await changeBackground(city)

    if (data.cod === '404') {
        showErrorMessage()
        return
    } 

        cityElement.innerText = data.name
        tempElement.innerText = parseInt(data.main.temp)
        descElement.innerText = data.weather[0].description
        weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`)
        humidityElement.innerText = `${data.main.humidity}%`
        windElement.innerText = `${data.wind.speed}Km/h`

        weatherContainer.classList.remove("hide")

}

//Events
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityInput.value
    showWeatherData(city)
});

cityInput.addEventListener("keyup", (e) => {
    if(e.code === "Enter") {
        const city = e.target.value
        showWeatherData(city)
    }
})

suggestionsButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const city = btn.getAttribute("id")

        showWeatherData(city)
    })
})