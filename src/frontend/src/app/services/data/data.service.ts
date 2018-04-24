import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {
  url_json : string = 'http://localhost:8000/api/json_files/'

  idSource = new BehaviorSubject<number>(null);
  currentId = this.idSource.asObservable();

  titleSource = new BehaviorSubject<string>('No File Selected');
  currentTitle = this.titleSource.asObservable();

  documentSource = new BehaviorSubject<document>(null);
  currentDocument = this.documentSource.asObservable();

  // documentSource = new BehaviorSubject<any>('Samer');
  // currentDocument = this.documentSource.asObservable();

  constructor(private http: HttpClient) { }
  //This service is used to store the primary key of the latex file we are working on
  // It is also used to :
  //    --> access the json format of this very latex files
  //    --> access the tree of choose parts
  //    --> access the new json the user wants to work : this json only contains
          // the parts selected by the user


  getJson(id){
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.url_json + String(id))
          .subscribe(
            data => {
              resolve(data);
              // console.log(data);
            },
            error => {
              console.log(error)
            }
          );
      }
    );
  }

  storeId(id: number){
    this.idSource.next(id);
    console.log("Document'id successfully saved");
  }

  storeTitle(title: string){
    this.titleSource.next(title);
    console.log("Document's title successfully saved");
  }

  storeDocument(doc: document){
    this.documentSource.next(doc);
    console.log("Document successfully saved");
  }

  // storeDocument(document: any){
  //   this.documentSource.next(document);
  //   console.log("Document successfully saved")
  // }

  // In order to get the id :
  // In the component : this.dataService.currentId.subsrcribe(id => this.id = id)

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
