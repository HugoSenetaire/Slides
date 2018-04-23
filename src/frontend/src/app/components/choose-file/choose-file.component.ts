import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { DataService } from '../../services/data/data.service';



@Component({
  selector: 'app-choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.css'],
})

export class ChooseFileComponent implements OnInit {
  public file : File;
  public id : number;

  public fileTitle : string = 'No file chosen';
  public filesInfos : FileInfos[];

  // userDocument: any;

  constructor(public uploadService: UploadService, public dataService: DataService) {
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
          this.id = (data as any).pk;
          console.log('success', data);
          this.fileTitle = file.name;
          this.showLatex();
          this.dataService.storeId(this.id);
          this.dataService.storeTitle(this.fileTitle);
        })
        .catch(error => {
          console.log(error);
        });
    }
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
      })
      .catch(error => {
        console.log(error);
      })
  }



  chooseOtherLatex($event){
    // this.json2us();
    this.dataService.storeId(this.id);
    // this.dataService.storeDocument(this.userDocument);
    for(var i = 0; i<this.filesInfos.length; i++){
      if(this.id == this.filesInfos[i].id){
          this.fileTitle = this.filesInfos[i].title;
      }
    }
    this.dataService.storeTitle(this.fileTitle);
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
