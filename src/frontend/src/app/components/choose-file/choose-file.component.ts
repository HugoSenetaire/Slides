import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service'



@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css'],
})

export class ChooseFileComponent implements OnInit {
  public file : File;
  public id : number = null;

  public fileTitle : string = 'No file chosen';
  public filesInfos : FileInfos[];

  constructor(private uploadService: UploadService) {
    this.showLatex();
 }

  ngOnInit() {

  }

  postFile(event){
    //Here we post the latex file on the server AND we store in uploadService
    // the id (primary key) of the latex file we just uploaded
    this.file = event.target.files;

    if (this.file != null){
      const file: File = this.file[0];
      const formData: FormData = new FormData();
      formData.append('latex', file);
      formData.append('title', file.name);
      this.uploadService.postLatex(formData)
        .then(data => {
          console.log('success', data);
          this.fileTitle = file.name;
          this.showLatex();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  // whatever(){
  //   this.uploadService.getJson()
  //     .then(data => {
  //       console.log(data);
  //     });
  // }

  oui(){
    console.log(this.uploadService.getId());
  }

  showLatex(){
    this.uploadService.getLatexFiles()
      .then(data => {
        let length = (data as any).length;
        this.filesInfos = [];
        for(var i = 0; i<length; i++){
          let infos = new FileInfos(Number(data[i].pk), data[i].title);
          this.filesInfos.push(infos);
        }
        console.log(this.filesInfos);
      })
      .catch(error => {
        console.log(error);
      })
  }


}

class FileInfos {
    id : number;
    title : string;
    constructor (id: number, title: string){
      this.id = id;
      this.title = title;
    }
}
