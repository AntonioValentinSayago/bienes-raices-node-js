(function() {
    const lat = 34.040967;
    const lng = -118.1618621;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa)
})()