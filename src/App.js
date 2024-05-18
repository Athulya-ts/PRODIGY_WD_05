// App.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import './App.css';

const API_KEY = '3028476b81b1814645cefa4461568678';

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <Container className="App">
      <Typography variant="h3" gutterBottom>
        Weather App
      </Typography>
      <form onSubmit={handleSubmit} className={loading ? 'form-loading' : ''}>
        <TextField
          label="Enter Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
        />
        <br/><br/>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Loading...' : 'Get Weather'}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      {weatherData && (
        <center>
          <div className="weather-container">
            <div className="weather-info">
              <Typography variant="h2">{weatherData.main.temp}°C</Typography>
              <Typography variant="h4">{weatherData.name}</Typography>
              <Typography variant="h5">{weatherData.weather[0].description}</Typography>
            </div>
          </div>
        </center>
      )}
    </Container>
  );
}

export default App;
