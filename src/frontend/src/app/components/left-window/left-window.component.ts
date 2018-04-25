import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';



@Component({
  selector: 'app-left-window',
  templateUrl: './left-window.component.html',
  styleUrls: ['./left-window.component.css']
})
export class LeftWindowComponent implements OnInit {
  userDocument : document;

  public constructor(public dataService: DataService) {
    // this.userDocument = new document();
    this.dataService.currentDocument.subscribe(doc => {
      this.userDocument = doc;
  });
  }


  public ngOnInit() {

  }

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
