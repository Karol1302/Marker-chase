import { Component, NgZone, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  

  toogleAccuracy(){
    console.log("dokładność")
  }
  toogleFollow(){
    console.log("podążanie")
  }
  data: any;

  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {}
  options = {
    timeout: 10000, 
    enableHighAccuracy: true, 
    maximumAge: 3600
  };

   
}
