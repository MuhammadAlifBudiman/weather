import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  constructor(private http: HttpClient) {}

  getWeather(city: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/weather?q=${city}&appid=${environment.weatherApiKey}&units=metric`
    );
  }
}
