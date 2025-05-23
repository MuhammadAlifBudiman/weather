// weather.component.ts - Angular component for displaying weather information
//
// This component provides a form for users to input a city name and fetches weather data
// using the WeatherService. It displays temperature, humidity, and weather description
// with corresponding emojis. Handles loading state and error messages.

import { CommonModule } from '@angular/common'; // Angular common directives
import { Component } from '@angular/core'; // Angular core component decorator
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // Reactive forms
import { WeatherService } from '../services/weather.service'; // Service for weather API calls

/**
 * WeatherComponent
 *
 * Displays a weather form and weather data for a given city.
 * Handles user input, API calls, and UI state (loading, error, results).
 */
@Component({
  selector: 'app-weather', // Component selector for template usage
  imports: [CommonModule, ReactiveFormsModule], // Required Angular modules
  templateUrl: './weather.component.html', // HTML template
  styleUrl: './weather.component.scss', // SCSS styles
})
export class WeatherComponent {
  /**
   * weatherForm: FormGroup
   * Reactive form group for city input.
   */
  weatherForm: FormGroup;

  /**
   * weatherData: any
   * Holds the weather data returned from the API.
   */
  weatherData: any = null;

  /**
   * temperatureEmoji: string | null
   * Emoji representing the temperature.
   */
  temperatureEmoji: string | null = null;

  /**
   * humidityEmoji: string | null
   * Emoji representing the humidity.
   */
  humidityEmoji: string | null = null;

  /**
   * descriptionEmoji: string | null
   * Emoji representing the weather description.
   */
  descriptionEmoji: string | null = null;

  /**
   * isLoading: boolean
   * Indicates if the weather data is being loaded.
   */
  isLoading = false;

  /**
   * errorMessage: string | null
   * Holds error messages for display.
   */
  errorMessage: string | null = null;

  /**
   * Constructor
   * @param fb FormBuilder for creating the form group
   * @param weatherService Service for fetching weather data
   */
  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    // Initialize the form with a city input field
    this.weatherForm = this.fb.group({ city: [''] });
  }

  /**
   * getTemperatureEmoji
   * Returns an emoji based on the temperature value.
   * @param temp Temperature in Celsius
   * @returns Emoji string
   */
  getTemperatureEmoji(temp: number): string {
    if (temp <= 0) return '❄️';
    if (temp > 0 && temp <= 10) return '🌬️';
    if (temp > 10 && temp <= 20) return '🌤️';
    if (temp > 20 && temp <= 30) return '☀️';
    return '🔥';
  }

  /**
   * getHumidityEmoji
   * Returns an emoji based on the humidity value.
   * @param humidity Humidity percentage
   * @returns Emoji string
   */
  getHumidityEmoji(humidity: number): string {
    if (humidity < 30) return '🌵';
    if (humidity >= 30 && humidity <= 60) return '☁️';
    return '💧';
  }

  /**
   * getDescriptionEmoji
   * Returns an emoji based on the weather description.
   * @param description Weather description string
   * @returns Emoji string
   */
  getDescriptionEmoji(description: string): string {
    const emojiMap: { [key: string]: string } = {
      'clear sky': '☀️',
      'few clouds': '🌤️',
      'scattered clouds': '⛅',
      'broken clouds': '🌥️',
      'overcast clouds': '☁️',
      'light rain': '🌦️',
      'moderate rain': '🌧️',
      'heavy intensity rain': '🌧️💦',
      thunderstorm: '⛈️',
      snow: '❄️',
      mist: '🌫️',
    };

    return emojiMap[description] || '❓';
  }

  /**
   * fetchWeather
   * Fetches weather data for the entered city using the WeatherService.
   * Handles loading state, error messages, and updates emoji representations.
   */
  fetchWeather() {
    this.errorMessage = null;
    this.isLoading = true;
    const city = this.weatherForm.value.city;

    if (!city) {
      this.isLoading = false;
      this.errorMessage = 'Please enter a city name or use your location.';
      return;
    }

    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.temperatureEmoji = this.getTemperatureEmoji(data.main.temp);
        this.humidityEmoji = this.getHumidityEmoji(data.main.humidity);
        this.descriptionEmoji = this.getDescriptionEmoji(
          data.weather[0].description
        );
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'City not found or API error.;';
        this.isLoading = false;
      },
    });
  }
}
