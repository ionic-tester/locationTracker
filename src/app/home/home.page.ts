import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: number;
  longitude: number;
  constructor() {}

  printCurrentPosition()
    {
      //console.log(this.locationService.checkGPSPermission());
      Geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      }).catch((error) => {
        alert('Error getting location. Please check Location Services and try again.');
        console.log(error);
      });
    }

}
