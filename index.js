let place = "new delhi"

// Select all the firlds you want to Dynamically Update
const temprature = document.querySelector('.temp');
const cityName = document.querySelector('.time_location p');
const cityTimeDate = document.querySelector('.time_location span')
const iconfield = document.querySelector('.weather_condition img');
const condition = document.querySelector('.weather_condition span')
const aqiLevel = document.querySelector('.aqi_levels h3');
const searchField = document.querySelector('.searchField');
const form = document.querySelector('form');

//adding eventListener to teh Button so API call is made
form.addEventListener('submit',search);

function search(e){
    e.preventDefault();
    place = searchField.value;
    fetchData(place);
}

async function fetchData(place){
    //Getting teh Data from the API and doing teh API Call
   try { 
       const url = `https://api.weatherapi.com/v1/current.json?key=35896614c66a4f0e9e573314250706&q=${place}&aqi=yes`
       
       const response = await fetch(url);//returns a promise(response object) and not the actual data waits for all stream of data  
       console.log(response);
       const data = await response.json();//this converts the response into Data that we want and can use
       console.log(data);
       
       //Now we will select all the data we need from teh API response data
       const currentTemp = data.current.temp_c;
       const locationName = data.location.name;
       const localTime = data.location.localtime;
       const currentCondition = data.current.condition.text;
       const conditionIcon = data.current.condition.icon;
       const localAqi = data.current.air_quality.pm10;
       console.log(`The current temperature in ${locationName} is ${currentTemp}°C. The weather is ${currentCondition}. Local time is ${localTime}. AQI Level is ${localAqi}`)
       updateDOM(currentTemp, locationName, localTime, currentCondition, conditionIcon, localAqi);
    }catch (error){
        window.alert('Wrong Input');
    }
}

// Now we will update the data on the DOM
function updateDOM(temp, locationName, time, localcondition, icon, aqi){
    temprature.textContent = `${temp}°C`;
    cityName.textContent = locationName;
    cityTimeDate.textContent = time;
    iconfield.src = icon;
    condition.textContent = localcondition;
    aqiLevel.textContent = aqi;
}

fetchData(place);