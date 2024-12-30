const weatherForm=document.querySelector(".weatherForm");
const cityInput=document.querySelector(".cityInput");
const container=document.querySelector(".container");
const apiKey="27121610a60026c052d617ab3bb7b80d";

weatherForm.addEventListener("submit",async event =>{
     event.preventDefault();
     const city=cityInput.value;

     if(city)
     {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error)
        {
            console.error(error);
            displayError(error);
        }
        
     }
     else {
        displayError("Please enter a City");
     }
});

async function getWeatherData(city) {
    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`
    const response= await fetch(apiUrl);

    if(!response.ok){
        throw new error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
       const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;

       container.textContent="";
       container.Style.display="flex";

       const cityDisplay = document.createElement("h1");
       const tempDisplay = document.createElement("p");
       const humDisplay = document.createElement("p");
       const descDisplay = document.createElement("p");
       const weatherEmoji = document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`${(temp-273.15).toFixed(1)}°F`;
    humDisplay.textContent=`Humidity:${humidity}%`;
    descDisplay.textContent=description;
    weatherEmoji.textContent=getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humDisplay.classList.add("humDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    container.appendChild(cityDisplay);
    container.appendChild(tempDisplay);
    container.appendChild(humDisplay);
    container.appendChild(descDisplay);
    container.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
        switch(true){
            case (weatherId >= 200 && weatherId < 300):
            return "⛈";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧";
        case (weatherId >= 600 && weatherId < 700):
            return "❄";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫";
        case (weatherId === 800):
            return "☀";
        case (weatherId >= 801 && weatherId < 810):
            return "☁";
        default:
            return "❓";
        }
}

function displayError(message){
        const errorDisplay = document.createElement("p");
        errorDisplay.textContent=message;
        errorDisplay.classList.add("errorDisplay");

        container.textContent="";
        container.style.display="flex";
        container.appendChild(errorDisplay);
}