var searchHistory = [];
var lastCitySearched = "";

var displayCityWeather = function(data) {
    var temperature = Math.round(data.main.temp);
    var humidity = data.main.humidity;
    var windSpeed = Math.round(data.wind.speed);
    var icon = data.weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/" + icon + ".png";

    $("#city-date").text((dayjs().format("ddd \n MM/DD/YYYY")));
    $("#city-temp").text("Temperature: " + temperature + "°F");
    $("#city-humid").text("Humidity: " + humidity + "%");
    $("#city-wind").text("Wind Speed: " + windSpeed + " mph");
    $("#weather-icon").empty();
    $("#weather-icon").append($("<img>").attr("src", iconUrl));     
    };

var display5DayForecast = function(data) {
    $("#five-day").empty();
  
    for (var i = 7; i < data.list.length; i += 8) {
      var forecast = data.list[i];
      var temp = Math.round(forecast.main.temp);
      var humidity = forecast.main.humidity;
      var wind = Math.round(forecast.wind.speed);
  
      var forecastCard = $("<div>").addClass("col-md-2 mb-4");
      var cardBody = $("<div>").addClass("card-body p-3");
      var tempText = $("<h6>").addClass("card-subtitle mt-3 text-muted").text("Temperature: " + temp + "°F");
      var humidText = $("<h6>").addClass("card-subtitle mt-3 text-muted").text("Humidity: " + humidity + "%");
      var windText = $("<h6>").addClass("card-subtitle mt-3 text-muted").text("Wind Speed: " + wind + " mph");
      var weekdayText =  $("<h5>").addClass("card-subtitle text-muted").text(dayjs(data.list[i].dt * 1000).format("dddd"));
      var dayText = $("<h5>").addClass("card-subtitle mt-3 text-muted").text(dayjs(data.list[i].dt * 1000).format("MM/DD/YYYY"));
      var weatherIcon = $(`<img src="https://openweathermap.org/img/wn/` + data.list[i].weather[0].icon + `.png">`);
  
      cardBody.append(weekdayText, dayText, weatherIcon, tempText, humidText, windText);
      forecastCard.append(cardBody);
      $("#five-day").append(forecastCard);
    }
  };

  var getCityWeather = function(city) {
    var cityName = city || $("#search-bar").val().trim();
    
    
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=21d879b7b731a9f3ad1beaec9dc719e4&units=imperial";
    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(response.statusText);
            }
        })
        .then(function(data) {
            displayCityWeather(data);
        })
        .catch(function(error) {
            alert("Unable to connect to OpenWeather server. Please try again later.");
        });
};

var get5DayForecast = function(city, display) {
    var cityName = $("#search-bar").val().trim();
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=21d879b7b731a9f3ad1beaec9dc719e4&units=imperial";
    
    fetch(apiUrl)
        .then(function(response) {
         if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
        })
        .then(function(data) {
            console.log(data);
            display5DayForecast(data);
        })
        .catch(function(error) {
        alert("Unable to connect to OpenWeather server. Please try again later.");
    });
}

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
        
        }
  });
});