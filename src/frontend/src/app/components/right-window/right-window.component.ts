import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-window',
  templateUrl: './right-window.component.html',
  styleUrls: ['./right-window.component.css']
})
export class RightWindowComponent implements OnInit {
  i:number = 0;
  constructor() { }

  ngOnInit() {
  }

  compile(){
    var beamerHeight = document.getElementById("beamer1").height;
    console.log(beamerHeight);
    beamerHeight = 0;
    console.log(beamerHeight);
    this.i +=1
    if (this.i==2){
      var beamerHeight2 = document.getElementById("beamer2").height;
      beamerHeight2 = 0;
      console.log(beamerHeight2);
    }
  }

}
