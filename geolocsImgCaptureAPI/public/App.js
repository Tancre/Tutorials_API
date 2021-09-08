function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(320, 240);
    video.parent('videoContainer');

    let lat, lon;
    const button = document.getElementById('submit');
    button.addEventListener('click', async event => {
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = {lat, lon, image64};
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

    if ('geolocation' in navigator) {
        console.log('geolocation available');
        navigator.geolocation.getCurrentPosition(position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        console.log(lat, lon);
        document.getElementById('lat').textContent = lat;
        document.getElementById('lon').textContent = lon;
        });
    } else {
        console.log('geolocation not available');
    }
    ;
}