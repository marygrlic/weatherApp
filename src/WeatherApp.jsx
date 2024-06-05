import React from 'react';
import './App.css';

class WeatherApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            weatherData: null,
            error: null,
        };
    }

    handleInputChange = (e) => {
        this.setState({city: e.target.value});
    };

    handleSearch = async () => {
        const { city } = this.state;
        try {
            const response = await fetch (
                `https://goweather.herokuapp.com/weather/${city}`
            );
            const data = await response.json();
            console.log(data)
            this.setState({weatherData: data, error: null})
        } catch (error) {
            console.log("Error fetching weather data", error);
            this.setState({
                error: "Failed to fetch weather data. Please try again"});
        }
    };

    render () {
        const { city, weatherData, error } = this.state;

        return (
            <div className = "container"> 
                <h1>Weather App</h1>
                <input 
                type = "text"
                value={city}
                onChange = {this.handleInputChange}
                placeholder = "Enter City Name"
                />
                <button onClick = {this.handleSearch}>Search</button>
                <div id = "weatherInfo" >
                    {error ? (
                        <p>{error}</p> 
                    ) : weatherData ? ( <> 
                        <p>Temperature {weatherData.temperature}</p>
                        <p>Wind {weatherData.wind}</p>
                        <p>Description {weatherData.description}</p>
                        <h3>Forecast {weatherData.description}</h3>
                        {weatherData.forecast.map((day) => (
                            <p key = {day.day}>
                            Day {day.day}: Temperature: {day.temperature}, {day.wind}
                        </p>
                    ))} 
                    </>) : null} 
                </div>
            </div>
        );
    }
}


export default WeatherApp;