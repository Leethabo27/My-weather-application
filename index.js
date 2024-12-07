document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search-input");
  const cityElement = document.querySelector("#current-city");
  const detailsElement = document.querySelector("#current-details");
  const iconElement = document.querySelector("#current-icon");
  const tempElement = document.querySelector("#current-temp");

  const apiKey = "2c95a04203o5bat4acd327d7c89f7e04"; 
  const apiUrl = "https://api.shecodes.io/weather/v1/current";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();

    if (city) {
      try {
        const response = await fetch(
          `${apiUrl}?query=${city}&key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();

        // Update weather details
        cityElement.textContent = data.city;
        detailsElement.textContent = `${data.condition.description}, Wind: ${data.wind.speed} m/s`;
        iconElement.innerHTML = `<img src="${data.condition.icon_url}" alt="${data.condition.description}">`;
        tempElement.textContent = Math.round(data.temperature.current);
      } catch (error) {
        cityElement.textContent = "Error";
        detailsElement.textContent = "Unable to fetch weather data.";
        iconElement.textContent = "❌";
        tempElement.textContent = "--";
      }
    }
  });
});







