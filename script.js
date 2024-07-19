let currentImage = document.getElementById("currentImage")
let searchBtn = document.getElementById("searchBtn")
let liveTemp = document.getElementById("liveTemp")
let inputValue = document.getElementById("inputValue")
let contents = document.querySelectorAll('.contents')
let cityName = document.getElementById("city")

searchBtn.addEventListener('click',run)


// API for Rohatk  like cities...
const api_key="c207b0a75225102b2080ca54d3636e52"
const city = 'Rohtak'
// const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`
async function run() {
    
    if(inputValue.value==""){
        alert('Enter City Name...')
        cityName.innerHTML = "City"
    }else{
    let cities = inputValue.value
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${api_key}&units=metric`

    const response = await fetch(url);
    // console.log(response);
    const result = await response.json();
    // console.log(result);
    if(response.status!=200){
        alert("Cannot fetch data...")
        contents.forEach(element => {
            element.innerText="Cannot Fetch Data.."
        });
        cityName.innerHTML = `<u>${inputValue.value}</u>`
        inputValue.value=""
        liveTemp.innerHTML="---"

    }else{
        cityName.innerHTML = `<u>${inputValue.value}</u>`
        inputValue.value=""
	currentImage.src = `https://openweathermap.org/img/wn/${result.weather[0].icon}.png`
    
    let main = result.main;

    // let timestamp = result.sys.sunrise
    // let dateObj = new Date(timestamp*1000)
    // For Sunrise...
    let dateObj1 = new Date(result.sys.sunrise*1000)
    let rise = dateObj1.toLocaleString()
    rise="Sunrise :-" + rise.split(",")[1]
    
    contents[0].innerHTML = rise

    // For Sunset....
    let dateObj2 =  new Date(result.sys.sunset*1000)
    let set = dateObj2.toLocaleString()
    set = "Sunset :- "+set.split(',')[1]

    contents[1].innerHTML = set

    // For max and min Temperature , feels_like and humidity...
    contents[2].innerHTML = "Max_Temp :- "+ main.temp_max.toFixed(1) + "<sup>o</sup>C"
    contents[3].innerHTML = "Min_Temp :- "+ main.temp_min.toFixed(1) + "<sup>o</sup>C"
    contents[4].innerHTML = "Feels_like :- "+ main.feels_like.toFixed(1) + "<sup>o</sup>C"
    contents[7].innerHTML = "Humidity :- " + main.humidity +"%"

    // For Speed and Rain...
    contents[5].innerHTML = "Wind_Speed :- " + result.wind.speed + " Km/hr"
    let weather = result.weather[0].description
    contents[6].innerHTML = "Weather :-  " + weather.charAt(0).toUpperCase() + weather.slice(1)

    // For Temperature...
    let temp =  result.main.temp
    temp = temp.toFixed(1)
    liveTemp.innerHTML = temp + "<sup>o</sup>C"
    }
}
}
run();
