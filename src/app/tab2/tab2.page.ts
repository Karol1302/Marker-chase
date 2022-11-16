import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: L.Map;
  constructor() {}

  ionViewDidEnter(){
    this.map = L.map('mapId').setView([49.7879,19.1869], 11);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
    L.control.locate().addTo(this.map);

    var markerOne = L.marker([49.7879,19.1869]);
    markerOne.addTo(this.map);

    var markerTwo = L.marker([49.7727974,19.0603719]);
    markerTwo.addTo(this.map);

  }
  

}
