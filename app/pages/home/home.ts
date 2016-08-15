import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { ChecklistPage } from '../checklist/checklist';
import { ChecklistModel } from '../../models/checklist';
import { DataService } from '../../providers/data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  checklists: ChecklistModel[] = [];

  constructor(
    private _navCtrl: NavController,
    private _alertCtrl: AlertController,
    private _dataService: DataService
  ) {
    this._loadData();
  }

  private _loadData(): void{
    this._dataService.getData()
    .then(checklists =>{
      checklists.forEach(checklist =>{
        let loadChecklist = new ChecklistModel(checklist.title, checklist.items, checklist.date);
        this.checklists.push( loadChecklist );
        loadChecklist.checklist
        .subscribe(update =>{
          this.save();
        })
      });
    })
    .catch(error =>{
      console.log(error);
    })
  }

  addChecklist(): void{
    let prompt = this._alertCtrl.create({
      title: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
      inputs: [
        {
          name: 'name',
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data =>{
            let newChecklist = new ChecklistModel(data.name);
            this.checklists.push(newChecklist);

            newChecklist.checklist
            .subscribe(update =>{
              this.save();
            });

            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  renameChecklist(checklist: ChecklistModel, index: number): void{
    let prompt = this._alertCtrl.create({
      title: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
      inputs: [
        {
          name: 'name',
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data =>{
            this.checklists[index].setTitle(data.name);
            this.save();
          }
        }
      ]
    });

    prompt.present();
  }

  removeChecklist(checklist: ChecklistModel, index: number): void{
    this.checklists.splice(index, 1);
    this.save();
  }

  goToChecklistPage(checklist: ChecklistModel): void{
    this._navCtrl.push(ChecklistPage, {
      checklist: checklist
    });
  }

  save(): void{
    this._dataService.saveData( this.checklists );
  }
}
