import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import 'leaflet-easybutton';
import { icon, Marker, easyButton } from 'leaflet';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';
import { asapScheduler } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BrowserStack } from 'protractor/built/driverProviders';


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
  zadanie: number = 0;
  ZLong: any;
  ZLat: any;

  qlat1: number = 49.89072;
  qlong1: number = 19.22203;
  qlat2: number = 49.88072;
  qlong2: number = 19.383;
  qlat3: number = 50.78072;
  qlong3: number = 19.12283;
  
  constructor(private geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder, private alertController: AlertController) {}


  ionViewDidEnter(){

    this.getCurrentCoordinates();
    var map = L.map('mapId').setView([this.qlat1, this.qlong1], 11);
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

    var userMarker, userAccuracyCircle;

    //markery z zadaniami
    // nalezy dac questMarker a potem SetLngLong ustawiac dane

    var questMarker1 = L.marker([49.9, 19.222],{icon: redMarker}).addTo(map);
    questMarker1.bindPopup("<b>Wskazówki dotarcia do zadania 1...</b>");


    // var edgeMarkerLayer = L.EdgeMarker({
    //   icon: L.icon({ // style markers
    //       iconUrl: 'images/edge-arrow-marker-black.png',
    //       //clickable: true,
    //       iconSize: [48, 48],
    //       iconAnchor: [24, 24]
    //   }),
    //   rotateIcons: true, // rotate EdgeMarkers depending on their relative position
    //   layerGroup: lGroup // you can specify a certain L.layerGroup to create the edge markers from.
    // }).addTo(map);

    switch(this.zadanie){
      case 0:
        this.ZLong = this.qlong1;
        this.ZLat  = this.qlat1;
        console.log("Zadanie 1");
      break;
      case 1:
        this.ZLong = this.qlong2;
        this.ZLat  = this.qlat2;
        map.removeLayer(questMarker1);
        var questMarker2 = L.marker([this.qlat2,this.qlong2],{icon: redMarker}).addTo(map);
        questMarker2.bindPopup("<b>Wskazówki dotarcia do zadania 2...</b>");
        console.log("Zadanie 2")
      break;
      case 2:
        this.ZLong = this.qlong3;
        this.ZLat  = this.qlat3;
        map.removeLayer(questMarker1);
        var questMarker3 = L.marker([this.qlat3,this.qlong3],{icon: redMarker}).addTo(map);
        questMarker3.bindPopup("<b>Wskazówki dotarcia do zadania 3...</b>");
        console.log("Zadanie 3")
      break;
      case 3:
        console.log("Wygrana");
        console.log(3)
      break;
    }

    var Check = ((((this.latitude - this.ZLat < 0.00005) && (this.longitude - this.ZLong < 0.00005)) || ((this.ZLat - this.latitude < 0.00005) && (this.ZLong - this.longitude < 0.00005))||
    ((this.ZLat - this.latitude < 0.00005) && (this.longitude - this.ZLong < 0.00005)) || ((this.ZLat - this.latitude < 0.00005) && (this.longitude - this.ZLong < 0.00005))));

    console.log(!Check)
    if(!Check){
      this.presentAlert();
      //Teraz prawidłowe rozwiązanie będzie mogło puścić switcha z zadaniem
    }
    var z = 0;

    //Trzeba jeszcze zrobic emulator
    //Odświerzanie lokalizacji w opcjach trochę do dupy bo będziesz przesuwał a program będzie wracał
    //Usuwanie kółka (może)
    //Koordynaty z zadań do jakiejś bazy
    //jeden questmarker, tylko zmiana set'a
    //uporządkować zmienne i this

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
        // var questMarker1 = L.marker([qlat1,qlong1],{icon: redMarker}).addTo(map);
        // questMarker1.bindPopup("<b>Wskazówki dotarcia...</b>");
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

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: ['OK'],
      inputs: [
        {
          placeholder: 'Name',
        },
        {
          placeholder: 'Nickname (max 8 characters)',
          attributes: {
            maxlength: 8,
          },
        },
        {
          type: 'number',
          placeholder: 'Age',
          min: 1,
          max: 100,
        },
        {
          type: 'textarea',
          placeholder: 'A little about yourself',
        },
      ],
    });

    await alert.present();
  }


  

}
