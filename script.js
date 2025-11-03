
const map = L.map('map').setView([13.0827, 80.2707], 12);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
});


L.Control.geocoder({ defaultMarkGeocode: true }).addTo(map);

const garbageData = [
  {
    location: "Near Anna Nagar",
    coords: [13.084, 80.210],
    severity: "High",
    color: "red",
    image: "https://i.ibb.co/8gjfDM4/garbage1.jpg"
  },
  {
    location: "Besant Nagar Beach",
    coords: [13.000, 80.270],
    severity: "Medium",
    color: "yellow",
    image: "https://i.ibb.co/JnJ1t0k/garbage2.jpg"
  },
  {
    location: "T Nagar Market",
    coords: [13.036, 80.234],
    severity: "Low",
    color: "green",
    image: "https://i.ibb.co/N3WzCJk/garbage3.jpg"
  },
  {
    location: "Adyar Riverbank",
    coords: [13.006, 80.254],
    severity: "High",
    color: "red",
    image: "https://i.ibb.co/SJ6JDC1/garbage4.jpg"
  }
];

let markers = []; 


function displayData(filterSeverity = "All") {
 
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  document.getElementById('garbage-list').innerHTML = "";

  garbageData.forEach(g => {
    
    if (filterSeverity !== "All" && g.severity !== filterSeverity) return;

   
    const marker = L.circleMarker(g.coords, {
      color: g.color,
      radius: 10
    }).addTo(map);

    marker.bindPopup(`<b>${g.location}</b><br>Severity: ${g.severity}`);
    markers.push(marker);

    // Sidebar entry
    const listItem = document.createElement('li');
    listItem.classList.add('garbage-item');
    listItem.innerHTML = `
      <h3>${g.location}</h3>
      <p>Severity: <strong style="color:${g.color}">${g.severity}</strong></p>
      <img src="${g.image}" alt="${g.location}">
    `;
    document.getElementById('garbage-list').appendChild(listItem);
  });
}


displayData();


document.getElementById('severityFilter').addEventListener('change', (e) => {
  const selected = e.target.value;
  displayData(selected);
});
