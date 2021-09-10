import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: number;
  longitude: number;
  state: any;
  constructor(public ngZone: NgZone) {}

  printCurrentPosition()
    {
      Geolocation.getCurrentPosition().then((resp) => {
        this.latitude = resp.coords.latitude;
        this.longitude = resp.coords.longitude;
      }).catch((error) => {
        alert('Error getting location. Please check Location Services and try again.');
        console.log(error);
      });
    }
    watchCurrentPosition()
  {
    this.state = Geolocation.watchPosition({}, (position, err) => {
      this.ngZone.run(() => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }).catch((error) => {
      alert('Error getting location. Please check Location Services and try again.');
      console.log(error);
    });
  }
  stopTracking() {
    Geolocation.clearWatch({ id: this.state}).catch((error) => {
      console.log('Error stopping location tracking, please try again or restart the application.');
    });
    this.latitude = 0.000000;
    this.longitude = 0.000000;
  }
}
