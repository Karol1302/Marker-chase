import { Component, } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  latitude: any = 0;
  longitude: any = 0;
  address: string;

  constructor() {}  
  };
