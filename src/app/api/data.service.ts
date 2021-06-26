import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = environment.API_URL;
  constructor(private http: HttpClient) {}

  getData = () => {
    return this.http.get(this.url);
  };

  postData = (pothole: any) => {
    return this.http.post(this.url, pothole, {
      headers: { 'Content-Type': 'application/json' },
    });
  };

  putData = (pothole: any) => {
    return this.http.put(this.url + '/' + pothole.id, pothole, {
      headers: { 'Content-Type': 'application/json' },
    });
  };
}
