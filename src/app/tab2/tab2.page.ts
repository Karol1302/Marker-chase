import { Component } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import 'leaflet-easybutton';
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: L.Map;
  constructor() {}

  ionViewDidEnter(){
   var map = L.map('mapId').setView([49.7879,19.1869], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
    // L.control.locate().addTo(map);
    // var markerOne = L.marker([49.7879,19.1869]);
    // markerOne.addTo(this.map);

    // var markerTwo = L.marker([49.7727974,19.0603719]);
    // markerTwo.addTo(this.map);
    
    // var toolbar = L.Toolbar();
    // toolbar.addToolbar(map);

    navigator.geolocation.getCurrentPosition(getPosition)

    if(!navigator.geolocation)
    console.log("Nie udało się pobrać lokalizacji")
    else
    {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(coords)
      }, 5000);
    }

    var userMarker, userAccuracyCircle
  
    function getPosition(position)
    {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var accuracy = position.coords.accuracy

      userMarker = L.marker([lat, long]),
      userAccuracyCircle = L.circle([lat, long], {radius: accuracy})

      var featureGroup = L.featureGroup([userMarker, userAccuracyCircle]).addTo(map)
      map.fitBounds(featureGroup.getBounds())
      console.log( "Latitude: " +lat + " Longitude: " +long +" Accuracy: " +accuracy)
    }

    function coords(position)
    {
      var lat = position.coords.latitude
      var long = position.coords.longitude
      var accuracy = position.coords.accuracy

      if(userMarker)
      {
        map.removeLayer(userAccuracyCircle)
      }
      if(userAccuracyCircle)
      {
        map.removeLayer(userMarker)
      }

      userMarker = L.marker([lat, long]),
      userAccuracyCircle = L.circle([lat, long], {radius: accuracy})
      var featureGroup = L.featureGroup([userMarker, userAccuracyCircle]).addTo(map)

    }
    L.easyButton('<img src="/path/to/img/of/penguin.png">', function(btn, map){
      var antarctica = [-77,70];
      map.setView(this.antarctica);
  }).addTo( map );
  


  }
  

}
