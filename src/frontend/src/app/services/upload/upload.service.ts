import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {
  url_latex : string = 'http://localhost:8000/api/latex_files/';
  url_json : string = 'http://localhost:8000/api/json_files/'
  id : number;

  constructor(private http: HttpClient) {

  }
  // This service only use is to upload latex files and to read them.

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

  getLatexFiles(){
    return new Promise(
      (resolve, reject) => {
        this.http.get(this.url_latex)
          .subscribe(
            data => {
              resolve(data);
            },
            error => {
              console.log(error)
            }
          );
      }
    );
  }


}
