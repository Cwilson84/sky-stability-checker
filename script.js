var searchHistory = [];
var lastCitySearched = "";

var getCityWeather = function getWeatherData(city) {
  var cityName = city.trim();
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=21d879b7b731a9f3ad1beaec9dc719e4&units=imperial";
  return fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        return response.json().then(function(data) {
          console.log(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather server. Please try again later.");
    });
};

$(document).ready(function() {
  $("#search-button").click(function(event) {
    event.preventDefault(); // prevent the form from submitting
    var city = $("#search-bar").val();
    getCityWeather(city);
  });
});
