Weather Now is a simple web application built using React that allows users to check the current weather for any city worldwide.Leveraging the Open-Meteo API for real-time weather data, 
users can input any city name to receive information on temperature, 
wind speed, and other weather conditions.This application is built to provide an intuitive interface and quick access to weather information for outdoor enthusiasts and general users.

Notes and Limitations
API Limitations: The Open-Meteo API might have usage limits or restrictions, which could affect data availability if usage exceeds free limits.
City Validation: The app currently uses a basic validation check for city names but does not filter invalid inputs beyond a single API check. Users should input valid city names for optimal results.
Geolocation Data: This app relies on a secondary geolocation API to translate city names into latitude and longitude coordinates. Make sure to check API availability for consistent data retrieval.
Internet Requirement: This app requires an active internet connection to fetch weather data from the API.
