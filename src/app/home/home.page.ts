import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ChecklistDataService } from '../services/checklist-data.service';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { Checklist } from '../interfaces/checklists';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  
  private slug: string;
  public numItems
  public itemObserver:any
  public checklist: Checklist;
  private checkLists: Checklist[];

  
  constructor(
    public dataService: ChecklistDataService, 
    private alertCtrl: AlertController, 
    private storage: Storage, 
    private navCtrl: NavController) {

    this.dataService.getObservable().subscribe(() => {
    this.checkLists = dataService.checklists;
     console.log("in HomePage constructor, checkLists updated " + this.checkLists);  
    
    })

  }




  ngOnInit(){

     this.checkLists = this.dataService.checklists;
     



  }


  //  azSort(){
    
  //   console.log("AZ sorting...");
    
     
  //    this.checkLists = this.dataService.checklists;
 
  //    return this.checkLists.sort(function(a,b) {return (a.items.length > b.items.length) ? 1 : ((b.items.length > a.items.length) ? -1 : 0);} );

  //    console.log(this.checklist.items)


  // }

   DscSort(){
    
    console.log("DscSort...");
    
     
    this.checkLists = this.dataService.checklists;
 
    this.checkLists.sort(function(a,b) {

      let aLen=a.items.filter(item=>!item.checked).length;
      let bLen=a.items.filter(item=>!item.checked).length;

    if( aLen>bLen){
      return -1
    }
    return 1

      });

  }





countRemain(checklist){

let count=checklist.items.filter(item=>!item.checked).length;
return count


}
  addChecklist(): void {

    this.alertCtrl.create({
      header: 'New Checklist',
      message: 'Enter the name of your new checklist below:',
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
            this.dataService.createChecklist(data);
          }

        }
      ]
    }).then((prompt) => {
      prompt.present();
    });

  }

  renameChecklist(checklist): void {

    this.alertCtrl.create({
      header: 'Rename Checklist',
      message: 'Enter the new name of this checklist below:',
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

            this.dataService.renameChecklist(checklist, data);

          }
        }
      ]
    }).then((prompt) => {
      prompt.present();
    });

  }

  removeChecklist(checklist): void{

    this.dataService.removeChecklist(checklist);

  }

}