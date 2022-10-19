import { Component, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: any = 0;
  longitude: any = 0;
  address: string;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };
   getCurrentCoordinates() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
     }).catch((error) => {
       console.log('Błąd lokalizowania', error);
     });
  }
  nativeGeocoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  getAddress(lat,long){
    this.nativeGeocoder.reverseGeocode(lat, long, this.nativeGeocoderOptions)
    .then((res: NativeGeocoderResult[]) => {
      this.address = this.pretifyAddress(res[0]);
    })
    .catch((error: any) => {
      alert('Błąd lokalizowania'+ JSON.stringify(error));
    });
  }
  pretifyAddress(address){
    let obj = [];
    let data = "";
    for (let key in address) {
      obj.push(address[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if(obj[val].length)
      data += obj[val]+', ';
    }
    return address.slice(0, -2);
  }
}
