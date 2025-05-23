import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

/**
 * WeatherService provides methods to interact with the OpenWeatherMap API
 * and fetch weather data for a given city.
 */
@Injectable({
  providedIn: 'root', // Makes the service available application-wide
})
export class WeatherService {
  /**
   * Base URL for the OpenWeatherMap API
   */
  private apiUrl = 'https://api.openweathermap.org/data/2.5';

  /**
   * Injects Angular's HttpClient for making HTTP requests
   * @param http Angular HttpClient instance
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetches current weather data for the specified city
   * @param city Name of the city to fetch weather for
   * @returns Observable containing weather data from the API
   */
  getWeather(city: string): Observable<any> {
    return this.http.get(
      // Constructs the API endpoint with city, API key, and metric units
      `${this.apiUrl}/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`
    );
  }
}
