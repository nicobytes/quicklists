import { Injectable } from '@angular/core';
import { IItem } from '../interfaces/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChecklistModel {

  checklist: Observable<any>;
  checklistObserver: any;

  constructor(
    public title: string,
    public items: IItem[] = [],
    public date: number = new Date().getTime()
  ) {
    this.checklist = Observable.create(observer=>{
      this.checklistObserver = observer;
    });
  }

  addItem(title: string): void{
    this.items.push({
      title: title,
      checked: false
    });
    this.checklistObserver.next(true);
  }

  removeItem(item: IItem): void{
    let index = this._searchItem(item);
    if(index > -1) this.items.splice(index, 1);
    this.checklistObserver.next(true);
  }

  renameItem(item: IItem, title: string): void{
    let index = this._searchItem(item);
    if(index > -1){
      this.items[index].title = title;
    }
    this.checklistObserver.next(true);
  }

  toggleItem(item: IItem): void{
    item.checked = !item.checked;
    this.checklistObserver.next(true);
  }

  setTitle(title: string){
    this.title = title;
    this.checklistObserver.next(true);
  }

  get doneItems(): IItem[]{
    return this.items.filter(item => item.checked);
  }

  private _searchItem(item: IItem): number{
    return this.items.indexOf(item);
  }
  

}

