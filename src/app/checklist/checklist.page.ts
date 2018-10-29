import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ChecklistDataService } from '../services/checklist-data.service';
import { Checklist } from '../interfaces/checklists';
import { ChecklistItem} from '../interfaces/checklists';
import { Storage } from '@ionic/storage';

 
@Component({
  selector: 'app-checklist',
  templateUrl: 'checklist.page.html',
  styleUrls: ['checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  private slug: string;
  public checklist: Checklist;
  public checklistitem: ChecklistItem;
  private storage: Storage;
  public priority: number;
  public checked: boolean;
  public opts=["1","2","3"]



  constructor(private alertCtrl: AlertController, private route: ActivatedRoute, private dataService: ChecklistDataService){


  }





  ngOnInit(){
    this.slug = this.route.snapshot.paramMap.get('id');

    this.loadChecklist();
    
    
  }

  loadChecklist(){
    if(this.dataService.loaded){
      this.checklist = this.dataService.getChecklist(this.slug);
    } else {
      this.dataService.load().then(() => {
        this.checklist = this.dataService.getChecklist(this.slug);

        console.log(this.checklist)
      });
    }
  }



    
    
 

  azSort(){
    
    console.log("AZ sorting...");


     return this.checklist.items.sort(function(a,b) {return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);} );

     console.log(this.checklist.items)



  }





  prioritySort(){
    
    console.log("Priority sorting...");
    
   

     return this.checklist.items.sort(function(a,b) {return (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0);} );

     console.log(this.checklist.items)



}


  setPriority(thisitemPriority):any {

  

      this.priority = thisitemPriority



   
     return this.priority 
  
  }

  addItem(): void {

    this.alertCtrl.create({
      header: 'Add Item',
      message: 'Enter the name of the task for this checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.addItem(this.checklist.id, data);
          }
        }
      ]
    }).then((prompt) => {
      prompt.present();
    });

  }

  removeItem(item): void {

    this.dataService.removeItem(this.checklist, item);

  }

  renameItem(item): void {

    this.alertCtrl.create({
      header: 'Rename Item',
      message: 'Enter the new name of the task for this checklist below:',
      inputs: [
        {
          type: 'text',
          name: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService.renameItem(item, data);
          }
        }
      ]
    }).then((prompt) => {
      prompt.present();  
    });

  }

  toggleItem(item): void {
    this.dataService.toggleItem(item);  
  }

}



