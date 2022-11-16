import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  map: L.map;
  constructor() {}

  ionViewDidEnter(){
    this.map = L.map('mapId').setView([49.7879,19.1869], 11);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(this.map);
    const markPoint = L.marker([49.7879,19.1869]);
    markPoint.bindPopup('<p>Leaflet</p>')
    this.map.addlayer(markPoint);
  }

}
