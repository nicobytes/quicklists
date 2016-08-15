import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ChecklistModel } from '../../models/checklist';
import { IItem } from '../../interfaces/interfaces';

@Component({
  templateUrl: 'build/pages/checklist/checklist.html',
})
export class ChecklistPage {

  checklist: ChecklistModel;

  constructor(
    private _navCtrl: NavController,
    private _navParams: NavParams,
    private _alertCtrl: AlertController
  ) {
    this.checklist = this._navParams.get('checklist');
  }

  addItem(): void{
    let prompt = this._alertCtrl.create({
      title: 'Add item',
      message: 'Enter the name of the task for this checlist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',     
        },
        {
          text: 'Save',
          handler: data =>{
            this.checklist.addItem( data.name );
          }
        }
      ]
    });
    prompt.present();
  }

  renameItem(item: IItem): void{
    let prompt = this._alertCtrl.create({
      title: 'Rename item',
      message: 'Enter the new name of the task for this checlist below:',
      inputs: [
        {
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',     
        },
        {
          text: 'Save',
          handler: data =>{
            this.checklist.renameItem(item, data.name );
          }
        }
      ]
    });
    prompt.present();
  }

  removeItem(item: IItem): void{
    this.checklist.removeItem(item);
  }

  toggleItem(item: IItem): void{
    this.checklist.toggleItem(item);
  }

  uncheckItems(): void{
    this.checklist.items.forEach(item =>{
      if(item.checked) this.checklist.toggleItem(item);
    })
  }

}
