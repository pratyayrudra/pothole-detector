import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = environment.API_URL;
  potholes: any;

  constructor(
    private http: HttpClient,
    private dbService: NgxIndexedDBService
  ) {}

  checkCache = () => {
    return new Promise((resolve, reject) => {
      this.dbService.getAll('potholes').subscribe((res: any) => {
        if (res.length == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  };

  loadData = () => {
    return new Promise((resolve) => {
      this.http.get(this.url).subscribe((res) => {
        this.potholes = res;
        this.dbService
          .bulkAdd('potholes', this.potholes)
          .subscribe((res: any) => {
            resolve(true);
          });
      });
    });
  };

  getData = () => {
    return this.dbService.getAll('potholes');
  };

  postData = (pothole: any) => {
    return this.dbService.add('potholes', pothole);
  };

  putData = (pothole: any) => {
    return this.dbService.update('potholes', pothole);
  };
}
