var searchHistory = [];
var lastCitySearched = "";

var displayCityWeather = function(data) {
    var temperature = Math.round(data.main.temp);
    var humidity = data.main.humidity;
    var windSpeed = Math.round(data.wind.speed);

    $("#city-temp").text("Temperature: " + temperature + "°F");
    $("#city-humid").text("Humidity: " + humidity + "%");
    $("#city-wind").text("Wind Speed: " + windSpeed + " mph");
};

var display5DayForecast = function(data) {
  // code to display the 5 day forecast data goes here
};

var getCityWeather = function getWeatherData(city) {
    var cityName = $("#search-bar").val().trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=21d879b7b731a9f3ad1beaec9dc719e4&units=imperial";
    fetch(apiUrl)
        .then (function(response) {
            if (response.ok) {
                response.json()
        .then (function(data) {
            displayCityWeather(data);
        });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather server. Please try again later.");
    });
};

var get5DayForecast = function(city) {
  var cityName = $("#search-bar").val().trim();
  var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=21d879b7b731a9f3ad1beaec9dc719e4&units=imperial";
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json()
          .then(function(data) {
            display5DayForecast(data);
          });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to OpenWeather server. Please try again later.");
    });
};

$("#search-button").click(function(event) {
    event.preventDefault(); // prevent the form from submitting
    var city = $("#search-bar").val().trim();
    getCityWeather(city);
    get5DayForecast(city);
    searchHistory.push(city);
    localStorage.setItem("lastCitySearched", city);
});

$(document).ready(function() {
  $("#search-button").click(function(event) {
    event.preventDefault(); // prevent the form from submitting
    var city = $("#search-bar").val();
    var lastCitySearched = localStorage.getItem("lastCitySearched");
        if (lastCitySearched !== null) {
            $("#search-bar").val(lastCitySearched);
            getCityWeather(lastCitySearched);
            get5DayForecast(lastCitySearched);
        } else {
            $("#search-bar").val(city);
            getCityWeather(city);
            get5DayForecast(city);
        }
  });
});