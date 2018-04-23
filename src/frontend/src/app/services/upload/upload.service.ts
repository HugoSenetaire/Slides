import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {
  url_latex : string = 'http://localhost:8000/api/latex_files/';
  url_json : string = 'http://localhost:8000/api/json_files/2'
  id : number = null;
  constructor(private http: HttpClient) { }


  postLatex(formData: FormData){
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.url_latex, formData)
          .subscribe(
            data => {
              console.log('success');
              resolve(data);
            },
            error => {
              console.log(error);
              reject(error);
            }
          );
      }
    );
  }

  getJson(){
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.url_json)
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

  storeId(id){
    this.id = id;
  }

  getId(){
    if (this.id != null){
      return this.id
    } else {
      console.log("No tex")
    }
  }
}
