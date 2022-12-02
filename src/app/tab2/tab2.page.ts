import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import 'leaflet-easybutton';
import { icon, Marker, easyButton } from 'leaflet';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';
import { asapScheduler } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';


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

var redMarker = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: L.Map;
  latitude: any = 0;
  longitude: any = 0;
  accuracy: any = 0;
  i: number = 0;
 
  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) {}

  ionViewDidEnter(){
  this.getCurrentCoordinates();
   var map = L.map('mapId').setView([49.7879,19.1869], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

    var i = 0;
    Loc();

    if(!navigator.geolocation)
    console.log("Nie udało się pobrać lokalizacji")
    else
    {
      setInterval(() => 
      { 
        i = 1;
        Loc();
      }, 2000);
    }

    var userMarker, userAccuracyCircle
    var qlat1 = 50.88072;
    var qlong1 = 19.22283; 
    var z = 0;
    var p = true;

    function getPosition(position)
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
      userAccuracyCircle = L.circle([lat, long], {radius: accuracy}),
      userMarker = L.marker([lat, long])
      var featureGroup = L.featureGroup([userMarker, userAccuracyCircle]).addTo(map)
      if(i < 1)
      {
        map.fitBounds(featureGroup.getBounds())
      }

      console.log( "Latitude: " +lat + " Longitude: " +long +" Accuracy: " +accuracy)

      // userMarker.bindPopup("<b>Tutaj jesteś!</b>").openPopup();
      // userAccuracyCircle.bindPopup("<b>Dokładność: </b>" + accuracy).openPopup()
  
      // if(z > 0)
      // {
      //   map.removeLayer(questMarker1)
      // }

      if(z < 1){
        var questMarker1 = L.marker([qlat1,qlong1],{icon: redMarker}).addTo(map);
        questMarker1.bindPopup("<b>Wskazówki dotarcia...</b>");
      }

      if((((lat - qlat1 < 0.00005) && (long - qlong1 < 0.00005)) || ((qlat1 - lat < 0.00005) && (qlong1 - long < 0.00005))||
          ((qlat1 - lat < 0.00005) && (long - qlong1 < 0.00005)) || ((qlat1 - lat < 0.00005) && (long - qlong1 < 0.00005)))){
      
      }

      z++;
    }
    
    function Loc()
    {
      navigator.geolocation.getCurrentPosition(getPosition);
    }

    var toggle = L.easyButton({
      states: [{
        stateName: 'locate',
        icon: '<img src="assets/loc-icon.png">',
        title: 'wyśrodkuj',
        onClick: function(position) {
          i = 0;
          Loc();
        }
      }]
    });
    toggle.addTo(map);
    // console.log(i);

    const layerGroup = L.layerGroup(); 
    new Geocoder({
      defaultMarkGeocode: false
    })
      .on('markgeocode', function(e) {
        layerGroup.clearLayers();
        var bbox = e.geocode.bbox;
        var poly = L.polygon([
          bbox.getSouthEast(),
          bbox.getNorthEast(),
          bbox.getNorthWest(),
          bbox.getSouthWest()
        ]).addTo(layerGroup);
        map.fitBounds(poly.getBounds());
        map.addLayer(layerGroup);
      })
      .addTo(map);
      
  
  }
  getCurrentCoordinates() {
    this.latitude = 0;
    this.longitude = 0;
    this.accuracy = 0;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = Math.round(resp.coords.accuracy);
      }).catch((error) => {
        console.log('Błąd lokalizowania', error);
      });
  }


  

}
