import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  title = 'pothole-detecter';
  lat = 22.560160123867558;
  lng = 88.39648161534278;
  locationChosen = true;
  potholes: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.dataService.checkCache().then((res) => {
      if (res) {
        console.log('Found in cache');
        this.dataService.getData().subscribe((data: any) => {
          this.potholes = data;
        });
      } else {
        console.log('Not found in cache loading from DB');
        this.dataService.loadData().then((res) => {
          this.dataService.getData().subscribe((data: any) => {
            this.potholes = data;
          });
        });
      }
    });
  };

  onChooseLocation(event: any) {
    console.log(event);
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }
}
