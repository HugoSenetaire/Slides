import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable()
export class MyService {
    myMethod$: Observable<any>;
    private myMethodSubject = new Subject<any>();

    constructor() {
        this.myMethod$ = this.myMethodSubject.asObservable();
    }

    myMethod(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        this.myMethodSubject.next(data);
        // we can do stuff with data if we want
        //this.myMethodSubject.next(data);
    }
}




@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css'],

})
export class ChooseFileComponent implements OnInit {
  file : FileList;
  public text : string;
  

  constructor(private myService: MyService) {
 }

  ngOnInit() {
  }
  getFile(event){
      this.file = event.target.files;
      var reader = new FileReader();
      reader.addEventListener("loadend", function() {
         // reader.result contient le contenu du
         // blob sous la forme d'un tableau typé
      });
      reader.readAsText(this.file[0]);
      console.log("something is happening..")
      // console.log(reader.readyState);
      reader.onload = (event) => {
        console.log(reader.result);
        this.text=reader.result;
        this.myService.myMethod(this.text);
      }
      
  }


}
