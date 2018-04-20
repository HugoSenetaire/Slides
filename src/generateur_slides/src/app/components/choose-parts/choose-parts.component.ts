import { Component, OnInit } from '@angular/core';
import { DndDropEvent, DropEffect } from "ngx-drag-drop";
import { MatSnackBar } from "@angular/material/snack-bar";


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

  constructor( private snackBarService:MatSnackBar ) {
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
