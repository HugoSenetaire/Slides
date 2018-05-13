import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-window',
  templateUrl: './right-window.component.html',
  styleUrls: ['./right-window.component.css']
})
export class RightWindowComponent implements OnInit {
  i:number = 0;
  constructor() {
    this.i = 0;
   }

  ngOnInit() {
  }

  compile(){
    // var beamerHeight = document.querySelector("beamer");
    beamer.src = "../../assets/beamer2.pdf";
    this.i += 1;
    if (this.i == 2){
      beamer.src = "../../assets/beamer3.pdf";
    }
  }

}
