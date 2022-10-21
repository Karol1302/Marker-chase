import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/user';
import { HttpClient } from '@angular/common/http';
import tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab2Page {
  title = 'my-map-app';
  userData:User[];
  map:any;
  marker:any;

  constructor(
    private httpclient: HttpClient
  ) {}
  ngOnInit() {
    this.map = tt.map({
      key: 'HXmY9HGvYnZRaQk2ZCMpSH7ABf9gnZao',
      container: 'map',
      style: 'tomtom://vector/1/basic-main',
      zoom:1.2
    });
    this.getJsonData();
  }

  getJsonData() {
    this.httpclient.get<User[]>('https://jsonplaceholder.typicode.com/users').subscribe((res) => {
      this.userData = res;
      for (var i=0;i<this.userData.length;i++) {
        this.marker = new tt.Marker({draggable:false})
            .setLngLat([this.userData[i].address.geo.lng,this.userData[i].address.geo.lat])
            .addTo(this.map);
      }
    });
  }
}
