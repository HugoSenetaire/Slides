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
  }

  storeTitle(title: string){
    this.titleSource.next(title);
  }

  // In order to get the id :
  // In the component : this.dataService.currentId.subsrcribe(id => this.id = id)

}
