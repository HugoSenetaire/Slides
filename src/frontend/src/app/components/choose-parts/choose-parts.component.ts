import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DataService } from '../../services/data/data.service';


// interface NestableListItem {
//   content:string;
//   disable?:boolean;
//   handle?:boolean;
//   customDragImage?:boolean;
//   children?:NestableListItem[];
// }

@Component({
  selector: 'app-choose-parts',
  templateUrl: './choose-parts.component.html',
  styleUrls: ['./choose-parts.component.css']
})


export class ChoosePartsComponent {
  fileTitle : string;
  id : number;
  userDocument : document;

  i_s : number = null;
  j_ss : number = null;
  k_sss : number = null;

  showNext : boolean = false;

  // nestableList : NestableListItem[] = [
  //   {
  //     content: "Partie1",
  //     children: [
  //       {
  //         content: "Sous partie 1",
  //         customDragImage: true
  //       }
  //     ]
  //   },
  //   {
  //     content: "Partie 2 (on peut pas mettre de sous parties ici)"
  //   },
  //   {
  //     content: "Partie 3",
  //     children: [
  //       {
  //         content: "Sous partie 1",
  //         handle: true
  //       },
  //       {
  //         content: "Sous Partie 2"
  //       },
  //       {
  //         content: "Sous Partie 3"
  //       }
  //     ]
  //   },
  //   {
  //     content: "Partie 4",
  //     children: []
  //   }
  // ];

  // private currentDraggableEvent:DragEvent;
  // private currentDragEffectMsg:string;

  constructor( private snackBarService:MatSnackBar, private dataService: DataService ) {
  }

  ngOnInit() {
    this.dataService.currentId.subscribe(id => this.id = id);
    this.dataService.currentTitle.subscribe(title => this.fileTitle = title);
    // this.userDocument = new document();
    this.json2us();
  }

  json2us(){
    //This function initialises the json doc received to better use it for html
    this.userDocument = new document();
    this.dataService.getJson(20) //Change this to this.id
      .then(data => {
        this.userDocument.sections = (data as document).sections;
        this.userDocument.title = this.fileTitle;
        for(var i = 0; i< this.userDocument.sections.length; i++){
          this.userDocument.sections[i].isChecked = false;
          this.userDocument.sections[i].type = "section";
          for(var j = 0; j< this.userDocument.sections[i].sub_sections.length; j++){
            this.userDocument.sections[i].sub_sections[j].isChecked = false;
            this.userDocument.sections[i].sub_sections[j].type = "sub_section";
            for(var k = 0; k< this.userDocument.sections[i].sub_sections[j].sub_sub_sections.length; k++){
              this.userDocument.sections[i].sub_sections[j].sub_sub_sections[k].isChecked = false;
              this.userDocument.sections[i].sub_sections[j].sub_sub_sections[k].type = "sub_sub_section";
            }

          }

        }
        console.log(this.userDocument);
      })
      .catch(error => {
        console.log(error);
      })
  }

  check_s(){
    this.userDocument.sections[this.i_s].isChecked = !this.userDocument.sections[this.i_s].isChecked;
    let isChecked = this.userDocument.sections[this.i_s].isChecked;
    if(!isChecked){
      for(var j = 0; j<this.userDocument.sections[this.i_s].sub_sections.length; j++){
        this.userDocument.sections[this.i_s].sub_sections[j].isChecked = false;
        for(var k = 0; k<this.userDocument.sections[this.i_s].sub_sections[j].sub_sub_sections.length; k++){
          this.userDocument.sections[this.i_s].sub_sections[j].sub_sub_sections[k].isChecked = false;
        }

      }
    }
    if(isChecked){
      for(var j = 0; j<this.userDocument.sections[this.i_s].sub_sections.length; j++){
        this.userDocument.sections[this.i_s].sub_sections[j].isChecked = true;
        for(var k = 0; k<this.userDocument.sections[this.i_s].sub_sections[j].sub_sub_sections.length; k++){
          this.userDocument.sections[this.i_s].sub_sections[j].sub_sub_sections[k].isChecked = true;
        }
      }
    }
  }

  check_ss(){
    this.userDocument.sections[this.i_s].sub_sections[this.j_ss].isChecked = !this.userDocument.sections[this.i_s].sub_sections[this.j_ss].isChecked;
    let isChecked = this.userDocument.sections[this.i_s].sub_sections[this.j_ss].isChecked;
    if(!isChecked){
      for(var i = 0; i<this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections.length; i++){
        this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections[i].isChecked = false;
      }
    }
    if(isChecked){
      this.userDocument.sections[this.i_s].isChecked = true;
      for(var i = 0; i<this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections.length; i++){
        this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections[i].isChecked = true;
      }
    }
  }

  check_sss(){
    this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections[this.k_sss].isChecked = !this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections[this.k_sss].isChecked
    let isChecked = this.userDocument.sections[this.i_s].sub_sections[this.j_ss].sub_sub_sections[this.k_sss].isChecked;
    if(isChecked){
      this.userDocument.sections[this.i_s].sub_sections[this.j_ss].isChecked = true;
      this.userDocument.sections[this.i_s].isChecked = true;
    }
  }

  confirmParts(){
    this.showNext = true;

    
  }

  us2json(){

  }

  // onDragStart( event:DragEvent ) {
  //
  //   this.currentDragEffectMsg = "";
  //   this.currentDraggableEvent = event;
  //
  //   this.snackBarService.dismiss();
  //   this.snackBarService.open( "Drag started!", undefined, {duration: 2000} );
  // }

  // onDragged( item:any, list:any[], effect:DropEffect ) {
  //
  //   this.currentDragEffectMsg = `Drag ended with effect "${effect}"!`;
  //
  //   if( effect === "move" ) {
  //
  //     const index = list.indexOf( item );
  //     list.splice( index, 1 );
  //   }
  // }

  // onDragEnd( event:DragEvent ) {
  //
  //   this.currentDraggableEvent = event;
  //   this.snackBarService.dismiss();
  //   this.snackBarService.open( this.currentDragEffectMsg || `Drag ended!`, undefined, {duration: 2000} );
  // }

  // onDrop( event:DndDropEvent, list?:any[] ) {
  //
  //   if( list
  //     && (event.dropEffect === "copy"
  //       || event.dropEffect === "move") ) {
  //
  //     let index = event.index;
  //
  //     if( typeof index === "undefined" ) {
  //
  //       index = list.length;
  //     }
  //
  //     list.splice( index, 0, event.data );
  //   }
  // }
}



class sub_sub_section {
  title: string;
  text: string;
  isChecked : boolean;
  type : string;
  constructor(){
    this.title = "";
    this.text="";
    this.isChecked = false;
    this.type = "sub_sub_section";
  }
}

class sub_section {
  title: string;
  text: string;
  isChecked : boolean;
  type : string;
  sub_sub_sections: sub_sub_section[];
  constructor(){
    this.title = "";
    this.text="";
    this.isChecked = false;
    this.sub_sub_sections = [];
    this.type = "sub_section";
  }
}

class section {
  title: string;
  text: string;
  isChecked : boolean;
  type : string;
  sub_sections: sub_section[];
  constructor(){
    this.title = "";
    this.text="";
    this.isChecked = false;
    this.sub_sections = [];
    this.type = "section";
  }
}

class document {
  title: string;
  sections: section[];
  constructor(){
    this.title = "";
    this.sections = [];
  }
}

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
