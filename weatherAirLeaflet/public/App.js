// Geo Locate
let lat, lon;
if ('geolocation' in navigator) {
    console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log(lat, lon);
    document.getElementById('lat').textContent = lat;
    document.getElementById('lon').textContent = lon;

    // IF CORS disabled + reverse proxy on server
    //const api_url = `/weather/${lat},${lon}` 

    const key = '0ffbda025ad4440fd3d66bb44e1a9582'
    let api_url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&appid=${key}`
    const response = await fetch(api_url);
    const json = await response.json();
    document.getElementById('summary').textContent = json.current.weather[0].description;
    document.getElementById('temperature').textContent = json.current.temp;
    console.log(json);
    });
} else {
    console.log('geolocation not available');
}

// Handle button pressed > sumbit data to db
const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    const data = {lat, lon};
    const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
});

