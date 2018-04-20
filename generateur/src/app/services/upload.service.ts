import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UploadService {
  url : string = '';

  constructor(private http: HttpClient) { }

  postLatex(formData: FormData){
    return new Promise(
      (resolve, reject) => {
        this.http.post(this.url, formData)
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

}
