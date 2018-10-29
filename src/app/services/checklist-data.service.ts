import { Injectable } from '@angular/core';
import { Checklist } from '../interfaces/checklists';
import { ChecklistItem} from '../interfaces/checklists';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChecklistDataService {

  public checklists: Checklist[] = [];
  public items: ChecklistItem[] = [];
  public loaded: boolean = false;
  private theObservable: Observable<Object>;
  private theObserver: Observer<Object>;
  public completeTasks:number[];


  constructor(private storage: Storage){

  }


  load(): Promise<boolean> {

    return new Promise((resolve) => {

      this.storage.get('checklists').then((checklists) => {

        let i = 0

        if(checklists != null){
          this.checklists = checklists;

        }

        this.loaded = true;
        resolve(true);


         console.log(this.completeTasks)
  
      });

    });

  }

  createChecklist(data): void {

    this.checklists.push({
      id: this.generateSlug(data.name),
      title: data.name,
      items: []
    });

    this.save();

  }

  renameChecklist(checklist, data): void {

    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists[index].title = data.name;
      this.save();
    }

  }

  removeChecklist(checklist): void {

    let index = this.checklists.indexOf(checklist);

    if(index > -1){
      this.checklists.splice(index, 1);
      this.save();
    }

  }

  getChecklist(id): Checklist {
    return this.checklists.find(checklist => checklist.id === id);
  }

  addItem(checklistId, data): void {

    this.getChecklist(checklistId).items.push({
      title: data.name,
      checked: false,
      priority:3,
    });

    this.save();

  }


  getItem(title): ChecklistItem {
    console.log(title)

    return this.items.find(item => item.title == title);

  }

  removeItem(checklist, item): void {

    let index = checklist.items.indexOf(item);

    if(index > -1){
      checklist.items.splice(index, 1);
      this.save()
    }    

  }

  renameItem(item, data): void {

    item.title = data.name;
    this.save();

  }

  toggleItem(item): void {
    item.checked = !item.checked;
    this.save();
  }

  save(): void {

    this.storage.set('checklists', this.checklists);

    // console.log("saved")
    // console.log(this.checklists)
  }


  public getObservable(): Observable<Object> {
    if (this.theObservable === undefined) {
      this.theObservable = Observable.create(observer =>
        this.theObserver = observer);
    }
    return this.theObservable;
    
  }




  generateSlug(title): string {

    // NOTE: This is a simplistic slug generator and will not handle things like special characters.
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    // Check if the slug already exists
    let exists = this.checklists.filter((checklist) => {
      return checklist.id.substring(0, slug.length) === slug;
    });

    // If the title is already being used, add a number to make the slug unique
    if(exists.length > 0){
      slug = slug + exists.length.toString();
    }

    return slug;

  }

}