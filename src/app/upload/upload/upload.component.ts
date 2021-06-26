import { Component, OnInit } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
import { DataService } from 'src/app/api/data.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  url: any;
  preview = false;
  loading: boolean = false;
  file: any;
  location: any = {
    latitude: 0,
    longitude: 0,
  };
  model: any;
  modelURL = 'https://teachablemachine.withgoogle.com/models/odNLPwo1a/';
  perc = 0;
  message = '';
  completed = false;
  spotted = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  onFileChanged = (event: any) => {
    this.completed = false;
    this.loading = true;
    this.message = 'Loading Image...';
    this.perc = 25;

    this.preview = true;
    const files = event.target.files;

    setTimeout(() => {
      this.perc = 50;
    }, 500);

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      setTimeout(() => {
        this.perc = 75;
      }, 500);

      this.url = reader.result;
      setTimeout(() => {
        this.perc = 100;
      }, 500);

      this.file = document.querySelector('img');

      setTimeout(() => {
        this.perc = 0;
        this.loading = false;
      }, 2000);
    };
  };

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          this.location.latitude = resp.coords.latitude;
          this.location.longitude = resp.coords.longitude;
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  upload = async () => {
    this.loading = true;
    this.perc = 0;
    if (this.location.latitude == 0 || this.location.longitude == 0) {
      this.message = 'Getting Geo Location since co-ordinates not entered...';
      this.perc = 20;
      this.getPosition().then((pos) => {
        this.location.latitude = pos.lat;
        this.location.longitude = pos.lng;
        console.log(this.location);
        console.log(`Positon: ${pos.lng} ${pos.lat}`);
        this.message = 'Got Geo Location...';
        this.perc = 40;
        this.predict();
      });
    } else {
      this.predict();
    }
  };

  predict = async () => {
    this.message = 'Loading Model..';
    this.perc = 50;
    this.model = await tmImage.load(
      this.modelURL + 'model.json',
      this.modelURL + 'metadata.json'
    );
    this.perc = 70;
    this.message = 'Model Loaded...';
    this.perc = 75;
    setTimeout(() => {
      this.message = 'Doing predictions...';
      this.perc = 80;
    }, 2000);
    const allPredictions = await this.model.predictTopK(this.file);
    setTimeout(() => {
      this.message = 'Prediction Done...';
      this.perc = 100;
    }, 2000);
    let data: any;

    setTimeout(() => {
      this.perc = 0;
      this.loading = false;
    }, 4000);

    if (allPredictions[0].className == 'Pothole') {
      setTimeout(() => {
        this.message = 'Saving to DB...';
        this.loading = true;
        this.perc = 50;
      }, 4500);
      data = {
        id: Math.floor(Math.random() * 1000),
        lat: this.location.latitude,
        long: this.location.longitude,
        status: true,
      };
      console.log(data);
      this.dataService.postData(data).subscribe((res: any) => {});
      this.spotted = true;
      setTimeout(() => {
        this.message = 'Uploaded...';
        this.perc = 100;
      }, 6000);
      setTimeout(() => {
        this.perc = 0;
        this.loading = false;
        this.completed = true;
      }, 8000);
    } else {
      this.spotted = false;
      setTimeout(() => {
        this.perc = 0;
        this.loading = false;
        this.completed = true;
      }, 4100);
    }
    this.file = null;
  };
}
