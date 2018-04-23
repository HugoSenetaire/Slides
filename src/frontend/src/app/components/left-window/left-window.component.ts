import { Component, OnInit } from '@angular/core';
import { ChooseFileComponent} from '../choose-file/choose-file.component';



@Component({
  selector: 'app-left-window',
  templateUrl: './left-window.component.html',
  styleUrls: ['./left-window.component.css']
})
export class LeftWindowComponent implements OnInit {
   public text:string;

  public constructor() {
  	console.log("constructeur fenetre gauche");
  }


  public ngOnInit() {

  }


}
