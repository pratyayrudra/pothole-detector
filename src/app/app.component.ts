import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pothole-detecter';
  lat = 51.678418;
  lng = 7.809007;
locationChosen=false

  onChooseLocation(event:any){
    console.log(event)
    this.lat=event.coords.lat;
    this.lng=event.coords.lng;
    this.locationChosen=true
  }
}
