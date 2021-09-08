getData();

async function getData() {
    const res = await fetch('/api');
    const data = await res.json();
    for (item of data) {
        const root = document.createElement('div');
        const latLonDate = document.createElement('div');
        const br = document.createElement('br')
        const geo = document.createElement('div');
        const date = document.createElement('div');
        const image = document.createElement('img');
        image.src = item.image64;

        root.classList.add('logs');
        latLonDate.classList.add('latLon')
        
        geo.textContent = `${item.lat}, ${item.lon}`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;

        latLonDate.append(geo, br, date)
        root.append(image, latLonDate);
        document.body.append(root);
    }
}