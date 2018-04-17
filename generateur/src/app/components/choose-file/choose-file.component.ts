import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css']
})
export class ChooseFileComponent implements OnInit {
  file : FileList;
  getFile(event){
      this.file = event.target.files;
      console.log(this.file);
  }
  constructor() {
 }

  ngOnInit() {
  }


}
