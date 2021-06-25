import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  potholes: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData = () => {
    this.dataService.getData().subscribe((data: any) => {
      this.potholes = data;
    });
  };

  changeStatus = (status: boolean, pothole: any) => {
    this.dataService
      .putData({ ...pothole, status: status })
      .subscribe((res: any) => {
        if (res) {
          this.getData();
        }
      });
  };
}
