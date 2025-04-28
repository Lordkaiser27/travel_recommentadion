let data; // variable global para almacenar los datos cargados

// Cargar los datos del archivo JSON
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    console.log("JSON cargado correctamente");
  })
  .catch(error => console.error('Error al cargar el JSON:', error));

// Escuchar el click del botón de búsqueda
document.getElementById('btnSearch').addEventListener('click', () => {
  const query = document.getElementById('destination').value.toLowerCase().trim();
  if (!data || query === "") return;

  const results = [];

  // Buscar en países y ciudades
  data.countries.forEach(country => {
    if (country.name.toLowerCase().includes(query)) {
      results.push(...country.cities);
    } else {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(query)) {
          results.push(city);
        }
      });
    }
  });

  // Buscar en templos
  data.temples.forEach(temple => {
    if (temple.name.toLowerCase().includes(query)) {
      results.push(temple);
    }
  });

  // Buscar en playas
  data.beaches.forEach(beach => {
    if (beach.name.toLowerCase().includes(query)) {
      results.push(beach);
    }
  });

  displayResults(results);
});

// Función para mostrar los resultados
function displayResults(results) {
  let container = document.getElementById('results');

  // Crear el contenedor si no existe
  if (!container) {
    container = document.createElement('div');
    container.id = 'results';
    document.body.appendChild(container);
  }

  container.innerHTML = ''; // Limpiar resultados anteriores

  if (results.length === 0) {
    container.innerHTML = '<p style="color:white;">No se encontraron resultados.</p>';
    return;
  }

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" class="result-image" style="width: 100%; max-width: 400px; border-radius: 8px;">
      <h3 style="color:white;">${item.name}</h3>
      <p style="color:white;">${item.description}</p>
    `;
    container.appendChild(card);
  });
}
