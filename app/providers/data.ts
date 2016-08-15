import { Injectable } from '@angular/core';
import { Storage, SqlStorage } from 'ionic-angular';
import { ChecklistModel } from '../models/checklist';

/*
  Generated class for the Data provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {

  storage: Storage;

  constructor() {
    this.storage = new Storage(SqlStorage, {name: 'checklisst'});
  }

  getData(): Promise<any>{
    return this.storage
    .get('checklists')
    .then(checklists => {
      if(checklists !== undefined) return Promise.resolve(JSON.parse(checklists));
      return Promise.reject('No existe');
    })
    .catch(error => Promise.reject(error))
  }

  saveData(data: ChecklistModel[]): void{
    let saveData = [];
    data.forEach( checklist =>{
      saveData.push({
        title: checklist.title,
        date: checklist.date,
        items: checklist.items
      });
    });
    this.storage.set('checklists', JSON.stringify( saveData ));
  }

}

