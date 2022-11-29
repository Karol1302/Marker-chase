import { Component, } from '@angular/core';
import { DatabaseService } from '../database.service';
import { SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  quests: any = [];
  latitude: any = 0;
  longitude: any = 0;
  address: string;

  constructor(public database: DatabaseService) {
    this.database.createDatabase().then(() =>{
      this.getQuests();
    })
  }
  getQuests(){
    this.database.getQuests().then((data) => {
      this.quests = [];
      if(data.rows.length > 0){
        for(var i = 0; i < data.rows.length; i++){
          this.quests.push(data.rows.item(i));
        }
      }
    });
  }  
  };


