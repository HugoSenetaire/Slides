import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service'
// import { Http, Response } from '@angular/http';
// import { HttpClient } from '@angular/common/http'
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css']
})
export class ChooseFileComponent implements OnInit {
  file : File;
  // url : string = 'http://localhost:8000/api_rest/images/';
  // img : string;

  constructor(private uploadService:UploadService) {

  }

  getFile(event){
      this.file = event.target.files;
      console.log(this.file);
  }

  upload(){
    if (this.file != null){
      const file: File = this.file[0];
      const formData: FormData = new FormData();
      formData.append('latex', file);
      console.log(file);
      this.uploadService.postLatex(formData)
        .then(data => {
          console.log('success', data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }



  ngOnInit() {
  }

}
