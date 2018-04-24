import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from '../../services/data/data.service';


interface NestableListItem {
  content:string;
  disable?:boolean;
  handle?:boolean;
  customDragImage?:boolean;
  children?:NestableListItem[];
}

@Component({
  selector: 'app-choose-parts',
  templateUrl: './choose-parts.component.html',
  styleUrls: ['./choose-parts.component.css']
})


export class ChoosePartsComponent {
  fileTitle : string;
  id : number;
  userDocument : any;

  nestableList:NestableListItem[] = [
    {
      content: "Partie1",
      children: [
        {
          content: "Sous partie 1",
          customDragImage: true
        }
      ]
    },
    {
      content: "Partie 2 (on peut pas mettre de sous parties ici)"
    },
    {
      content: "Partie 3",
      children: [
        {
          content: "Sous partie 1",
          handle: true
        },
        {
          content: "Sous Partie 2"
        },
        {
          content: "Sous Partie 3"
        }
      ]
    },
    {
      content: "Partie 4",
      children: []
    }
  ];

  private currentDraggableEvent:DragEvent;
  private currentDragEffectMsg:string;

  constructor( private snackBarService:MatSnackBar, private dataService: DataService ) {
  }

  ngOnInit() {
    this.dataService.currentId.subscribe(id => this.id = id);
    this.dataService.currentTitle.subscribe(title => this.fileTitle = title);
    // this.userDocument = new document();
    this.json2us();
    console.log(this.userDocument)
  }

  json2us(){
    this.dataService.getJson(20) //Change this to this.id
      .then(data => {
        this.userDocument = (data as any);
        this.userDocument.title_latex = this.fileTitle;
        console.log(this.userDocument);
      })
      .catch(error => {
        console.log(error);
      })
  }

  us2json(){

  }

  onDragStart( event:DragEvent ) {

    this.currentDragEffectMsg = "";
    this.currentDraggableEvent = event;

    this.snackBarService.dismiss();
    this.snackBarService.open( "Drag started!", undefined, {duration: 2000} );
  }

  onDragged( item:any, list:any[], effect:DropEffect ) {

    this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;

    if( effect === "move" ) {

      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }

  onDragEnd( event:DragEvent ) {

    this.currentDraggableEvent = event;
    this.snackBarService.dismiss();
    this.snackBarService.open( this.currentDragEffectMsg || `Drag ended!`, undefined, {duration: 2000} );
  }

  onDrop( event:DndDropEvent, list?:any[] ) {

    if( list
      && (event.dropEffect === "copy"
        || event.dropEffect === "move") ) {

      let index = event.index;

      if( typeof index === "undefined" ) {

        index = list.length;
      }

      list.splice( index, 0, event.data );
    }
  }
}



// class sub_sub_section {
//   title: string;
//   text: string;
//   constructor(){
//     this.title = "";
//     this.text="";
//   }
// }
//
// class sub_section {
//   title: string;
//   text: string;
//   sub_sub_sections: sub_sub_section[];
//   constructor(){
//     this.title = "";
//     this.text="";
//     this.sub_sub_sections = [];
//   }
// }
//
// class section {
//   title: string;
//   text: string;
//   sub_sections: sub_section[];
//   constructor(){
//     this.title = "";
//     this.text="";
//     this.sub_sections = [];
//   }
// }
//
// class document {
//   title: string;
//   sections: section[];
//   constructor(){
//     this.title = "";
//     this.sections = [];
//   }
// }

// Other version of json2us (useless) :
// this.userDocument.title = this.fileTitle;
// this.dataService.getJson(this.id)
//   .then(data => {
//     // console.log(data);
//     let nbr_sections = (data as any).sections.length;
//     if (nbr_sections>0){
//       for(var i=0; i<nbr_sections; i++){
//         let _section = new section();
//         this.userDocument.sections.push(_section);
//         _section.title = (data as any).sections[i].title;
//         _section.text = (data as any).sections[i].text;
//         let nbr_sub_sections = (data as any).sections[i].sub_sections.length;
//         if (nbr_sub_sections>0){
//           for(var j=0; j<nbr_sub_sections; j++){
//             let _sub_section = new sub_section();
//             this.userDocument.sections[i].sub_sections.push(_sub_section);
//             _sub_section.title = (data as any).sections[i].sub_sections[j].title;
//             _sub_section.text = (data as any).sections[i].sub_sections[j].text;
//             let nbr_sub_sub_sections = (data as any).sections[i].sub_sections[j].sub_sub_sections.length;
//             if (nbr_sub_sub_sections>0){
//               for(var k=0; k<nbr_sub_sub_sections; k++){
//                 let _sub_sub_section = new sub_sub_section();
//                 _sub_sub_section.title = (data as any).sections[i].sub_sections[j].sub_sub_sections[k].title;
//                 _sub_sub_section.text = (data as any).sections[i].sub_sections[j].sub_sub_sections[k].text;
//                 this.userDocument.sections[i].sub_sections[j].sub_sub_sections.push(_sub_sub_section);
//               }
//             }
//             this.userDocument.sections[i].sub_sections[j] = _sub_section;
//           }
//
//         }
//
//         this.userDocument.sections[i] = _section;
//
//       }
//     }
//   })
//   .catch(error => {
//     console.log(error);
//   })
