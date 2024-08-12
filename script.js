// Función para seleccionar el perfil
function selectProfile(profileId) {
  document.querySelectorAll('#step-1 .card').forEach((card) => {
    card.classList.remove('card-selected');
  });
  document.getElementById(profileId).classList.add('card-selected');
}

// Función para seleccionar la cantidad de horas
function selectCard(cardId) {
  // Remueve la selección de todas las tarjetas
  document.querySelectorAll('#step-3 .card').forEach((card) => {
    card.classList.remove('card-selected');
  });

  // Añade la clase de selección a la tarjeta seleccionada
  document.getElementById(cardId).classList.add('card-selected');

  // Muestra el campo de horas personalizadas si la tarjeta seleccionada es "Personalizado"
  if (cardId === 'custom_card') {
    document.getElementById('custom_hours').classList.remove('hidden');
  } else {
    document.getElementById('custom_hours').classList.add('hidden');
  }

  calculate(); // Llamada a calculate cuando se selecciona una tarjeta
}

// Función para seleccionar la opción de costo de vida
function selectCostOfLiving(optionId) {
  document.querySelectorAll('#step-4 .card').forEach((card) => {
    card.classList.remove('card-selected');
  });
  document.getElementById(optionId).classList.add('card-selected');

  if (optionId === 'cost_known') {
    document.getElementById('cost_of_living_input').classList.remove('hidden');
    document.getElementById('city_country_input').classList.add('hidden');
    document.getElementById('disclaimer').classList.add('hidden');
  } else if (optionId === 'cost_average') {
    document.getElementById('cost_of_living_input').classList.add('hidden');
    document.getElementById('city_country_input').classList.remove('hidden');
    document.getElementById('disclaimer').classList.remove('hidden');
  }
  calculate(); // Llamada a calculate cuando se selecciona una opción de costo de vida
}

// Función para realizar los cálculos
function calculate() {
  const monthlyIncome =
    parseFloat(document.getElementById('monthly_income').value) || 0;
  const customHours =
    parseFloat(document.getElementById('custom_hours').value) ||
    getSelectedHours();
  let costOfLiving = 0;

  // Determinar si se usa el costo de vida ingresado o el de la ciudad seleccionada
  if (
    document.getElementById('cost_known').classList.contains('card-selected')
  ) {
    costOfLiving =
      parseFloat(document.getElementById('cost_of_living').value) || 0;
  } else if (
    document.getElementById('cost_average').classList.contains('card-selected')
  ) {
    const selectedCityCost =
      parseFloat(
        document.getElementById('selectedCity').getAttribute('data-value')
      ) || 0;
    costOfLiving = selectedCityCost;
  }

  const hourlyRate = (monthlyIncome / customHours).toFixed(2);
  const minimumRate = (costOfLiving / customHours).toFixed(2);

  document.getElementById('current_hourly_rate').innerText = `$${hourlyRate}`;
  document.getElementById('minimum_hourly_rate').innerText = `$${minimumRate}`;
  document.getElementById('results').classList.remove('hidden');
}

// Función para obtener las horas seleccionadas en función de la tarjeta seleccionada
function getSelectedHours() {
  const selectedCard = document.querySelector('#step-3 .card-selected');
  if (selectedCard) {
    return parseFloat(selectedCard.getAttribute('data-hours')) || 173.2;
  }
  return 173.2; // Valor predeterminado para Full Time
}

// Función para mostrar/ocultar el menú desplegable
function toggleDropdown() {
  document.getElementById('dropdownMenu').classList.toggle('hidden');
}

// Función para seleccionar una ciudad en el menú desplegable
function selectCity(cityText, cityValue) {
  document.getElementById('selectedCity').innerText = cityText;
  document.getElementById('selectedCity').setAttribute('data-value', cityValue);
  document.getElementById('dropdownMenu').classList.add('hidden');
  calculate(); // Llamada a calculate cuando se selecciona una ciudad
}
