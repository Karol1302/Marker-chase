import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import 'leaflet-easybutton';
import { icon, Marker, easyButton } from 'leaflet';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';
import { asapScheduler } from 'rxjs';

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


    // L.control.locate({showCompass: true}).addTo(map);

    // var lc = L.control
    // .locate({
    //   position: "topright",
    //   strings: {
    //     title: "Jesteś tu!"
    //   },
    //   drawCircle: true,
    //   showCompass: true,
    // })
    // .addTo(map);

    var i = 0
    Loc();

    if(!navigator.geolocation)
    console.log("Nie udało się pobrać lokalizacji")
    else
    {
      setInterval(() => 
      { i = 1
        Loc();
      }, 5000);
    }
    // console.log(i);

    L.marker([50,19]).addTo(map);

    var userMarker, userAccuracyCircle

    // userAccuracyCircle = null
    console.log(userAccuracyCircle)
  
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

      console.log(userAccuracyCircle)
      userMarker = L.marker([lat, long]),
      userAccuracyCircle = L.circle([lat, long], {radius: accuracy})
      console.log(userAccuracyCircle)

      var featureGroup = L.featureGroup([userMarker, userAccuracyCircle]).addTo(map)
      if(i < 1)
      {
        map.fitBounds(featureGroup.getBounds())
      }
      //console.log(i)
      // console.log( "Latitude: " +lat + " Longitude: " +long +" Accuracy: " +accuracy)
      // userMarker.bindPopup("<b>Tutaj jesteś!</b>").openPopup();
      // userAccuracyCircle.bindPopup("<b>Dokładność: </b>" + accuracy).openPopup();
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
  

}
