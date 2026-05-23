const form = document.getElementById("weather-form");
const toastElement = document.getElementById("toast");
const toastIcon = document.getElementById("toast-icon");
const toastMessage = document.getElementById("toast-message");
const cityElement = document.getElementById("result-city");
const countryElement = document.getElementById("result-country");
const forecastElement = document.getElementById("result-forecast");
const tempCElement = document.getElementById("result-temp");
const locationElement = document.getElementById("result-location");
const weatherResult = document.getElementById("weather-result");
const backBtn = document.getElementById("back-btn");
const toastCloseBtn = document.getElementById("toast-close");
0;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await getWeather();
});

backBtn.addEventListener("click", () => {
  form.classList.remove("hidden");
  weatherResult.classList.add("hidden");
});

toastCloseBtn.addEventListener("click", () => {
  toastElement.classList.remove("show");
});

let toastTimeout;

let showToast = () => {
  toastElement.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 4500);
};

const toast = (message, type) => {
  if (type == "success") {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  } else if (type == "error") {
    toastIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
  } else {
    toastIcon.innerHTML = `<i class="fa-solid fa-circle-info"></i>`;
  }
  toastMessage.textContent = message;
  toastElement.className = `toast ${type}`;
  showToast();
};

const getWeather = async () => {
  try {
    let city = document.getElementById("city").value;
    let lat = document.getElementById("lat").value;
    let lon = document.getElementById("lon").value;
    let response;
    if (!city && (!lat || !lon)) {
      toast("Error: please enter a city or coordinates.", "error");
      return;
    }
    if (city) {
      response = await fetch("/api/weather?city=" + city);
    } else if (lat && lon) {
      response = await fetch("/api/weather?lat=" + lat + "&lon=" + lon);
    }
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast("Weather data fetched successfully", "success");
      const weather = data.forecast;
      const city = data.city;
      const lon = data.lon;
      const lat = data.lat;
      const country = data.country;
      const temp_c = data.temp_c;
      const temp_f = data.temp_f;
      cityElement.textContent = city;
      countryElement.textContent = country;
      forecastElement.textContent = weather;
      tempCElement.textContent = temp_c + "°C" + " / " + temp_f + "°F";
      locationElement.textContent = `(${lat}, ${lon})`;
      form.classList.add("hidden");
      weatherResult.classList.remove("hidden");
      form.reset();
    } else {
      toast("Error: " + data.error, "error");
    }
  } catch (error) {
    toast("Error fetching weather data: " + error, "error");
  }
};
