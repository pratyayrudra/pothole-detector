import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UploadComponent } from './upload/upload/upload.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'Pothole DB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'potholes',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: true } },
        { name: 'lat', keypath: 'lat', options: { unique: false } },
        { name: 'long', keypath: 'long', options: { unique: false } },
        { name: 'status', keypath: 'status', options: { unique: false } },
      ],
    },
  ],
};
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.MAP_API,
    }),
    NgxIndexedDBModule.forRoot(dbConfig),
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
