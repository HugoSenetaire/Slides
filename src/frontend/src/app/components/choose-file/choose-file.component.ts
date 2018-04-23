import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service'



@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css'],
})

export class ChooseFileComponent implements OnInit {
  file : File;
  id : number = null;
  constructor(private uploadService: UploadService) {
 }

  ngOnInit() {

  }

  getFile(event){
    this.file = event.target.files;
    console.log(this.file);

    if (this.file != null){
      const file: File = this.file[0];
      const formData: FormData = new FormData();
      formData.append('latex', file);
      this.uploadService.postLatex(formData)
        .then(data => {
          console.log('success', data);
          this.id = data.pk;
          console.log(this.id);
          this.uploadService.storeId(this.id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  whatever(){
    this.uploadService.getJson()
      .then(data => {
        console.log(data);
      });
  }

  oui(){
    console.log(this.uploadService.getId());
  }


}
