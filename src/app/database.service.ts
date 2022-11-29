import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  databaseObject: SQLiteObject;
  tables = {
    quests: "quests"
  }

  constructor(private sqlite: SQLite) { }
  
  async createDatabase(){
    await this.sqlite.create({
      name: "ionic_sqlite_database",
      location: "default",
    }).then((db: SQLiteObject) => {
      this.databaseObject = db;
    }).catch((e) =>{
      alert("error on creating database! " + JSON.stringify(e));
      console.log("error on creating")
    });
    await this.createTables();
  }

  async createTables(){
    await this.databaseObject.executeSql(
      `CREATE TABLE IF NOT EXIST ${this.tables.quests} (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255) NOT NULL UNIQUE, description VARCHAR(255) NOT NULL)`,
      []
    );
  }

  async addQuest(name: string, description: string){
    return this.databaseObject
    .executeSql(
      `INSERT INTO ${this.tables.quests} (name, description) VALUES ('${name}'), ('${description}')`,
      []
    ).then(() => {
      return "category created!";
    }).catch((e) => {
      if(e.code === 6){
        return "category already exists!";
      }
      return "error on creating quest " + JSON.stringify(e);
    });

  }

  async getQuests(){
    return this.databaseObject
    .executeSql(
      `SELECT * FROM ${this.tables.quests} ORDER BY name ASC`,
      []
    )
    .then((res) => {
      return res;
    })
    .catch((e) => {
      return "error on getting quests! " + JSON.stringify(e);
    });
  }

  async deleteQuest(id: number){
    return this.databaseObject
    .executeSql(
      `DELETE FROM ${this.tables.quests} WHERE id = ${id}`,
      []
    )
    .then((res) => {
      return "quest deleted!";
    })
    .catch((e) => {
      return "error on deleting quests! " + JSON.stringify(e);
    });
  }

  async editQuest(name: string, id: number, description: string){
    return this.databaseObject
    .executeSql(
      `UPDATE ${this.tables.quests} SET name = '${name}', description = '${description}' WHERE id = ${id}`,
      []
    )
    .then((res) => {
      return "quest updated!";
    })
    .catch((e) => {
      return "error on updating quest! " + JSON.stringify(e);
    });
  }
  
}
