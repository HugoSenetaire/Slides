import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';
import { HttpClient } from '@angular/common/http';
// import { DomSanitizationService } from '@angular/platform-browser/domsanitizer';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-right-window',
  templateUrl: './right-window.component.html',
  styleUrls: ['./right-window.component.css']
})
export class RightWindowComponent implements OnInit {
  public srcBeamer:string = 'http://localhost:8000/media/beamer.pdf';
  public i:number = -1;
  public j:number = -1;
  public k:number = -1;
  latexDocument : document;
  beamerDocument : document_beamer;

  public constructor(public dataService: DataService, public http:HttpClient, protected sanitizer:DomSanitizer) {
    // this.userDocument = new document();
    this.dataService.currentDocument.subscribe(doc => {
      this.latexDocument = doc;
  });
  this.begin_beamer();
  // this.srcBeamer = '/home/lou/enpc/Slides/src/frontend/src/assets/beamer1.pdf';
  // this.srcBeamer = '/home/lou/enpc/Slides/src/frontend/src/assets/beamer'+String(this.beamerDocument.id)+'.pdf';
  // this.compile();
  }


  ngOnInit() {
  }

  drop(event) {
    var text_to_add = "";
    if (window.getSelection) {
        text_to_add = window.getSelection().toString();
        if(this.i>-1){
          if(this.j>-1){
            if(this.k>-1){
              this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections[this.k].text.push(text_to_add);
            } else {
              this.beamerDocument.sections[this.i].sub_sections[this.j].text.push(text_to_add);
            }
          } else {
            this.beamerDocument.sections[this.i].text.push(text_to_add);
          }
        }
    }
  }


  // public call_beamer_safe():SafeResourceUrl {
  //   console.log(this.sanitizer.bypassSecurityTrustResourceUrl(this.srcBeamer));
	// 	return this.sanitizer.bypassSecurityTrustResourceUrl(this.srcBeamer);
	// }

  send_data(){
    this.http.post('http://localhost:8000/beamer/', JSON.stringify(this.beamerDocument))
      .subscribe(
        res =>{
        console.log(res);
      },
      err => {console.log("Error occured")}
    );
    this.wait(2000);
  }

  compile(){
    var tag:string = '<embed src="http://localhost:8000/media/beamer.pdf" width="100%" height="670">';
    console.log(tag);
    $('#beamer').html(tag);
    console.log("DONE COMPILING");
  }

  // load_pdf(path){
  //   if(path==0){
  //     $('#beamer').html('<iframe src="../../assets/beamer.pdf" width="100%" height="670"></iframe>');
  //   }
  //   else{
  //     $('#beamer').html('<iframe src="../../assets/beamer1.pdf" width="100%" height="670"></iframe>');
  //   }
  // }

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms){
      end = new Date().getTime();
    }
  }

  cancel(){
    // this.http.post('http://localhost:8000/beamer/', JSON.stringify(this.beamerDocument))
    //   .subscribe(
    //     res =>{
    //     console.log(res);
    //   },
    //   err => {console.log("Error occured")}
    // );
    // // console.log(this.beamerDocument);
    // this.wait(7000);
    // console.log(this.beamerDocument.id);
  }

  prec(){
    if(this.k-1 >-1){
      this.k -=1;
    } else {
      this.k = -1;
      if(this.j-1 > -1){
        this.j -= 1;
        if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
          this.k = 0;
        }
      } else {
        this.j = -1;
        this.k = -1;
        if(this.i-1 > -1){
          this.i -=1;
          if(this.beamerDocument.sections[this.i].sub_sections.length>0){
            this.j = 0;
            if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
              this.k = 0;
            }
          }
        } else {
          this.i = 0;
          if(this.beamerDocument.sections[this.i].sub_sections.length>0){
            this.j = 0;
            if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
              this.k = 0;
            }
          }

        }
      }
    }
    console.log(this.i,this.j,this.k);
  }

  suiv(){
    if(this.k+1 < this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length){
      this.k +=1;
    } else {
      this.k = -1;
      if(this.j+1 < this.beamerDocument.sections[this.i].sub_sections.length){
        this.j += 1;
        if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
          this.k = 0;
        }
      } else {
        this.j = -1;
        this.k = -1;
        if(this.i+1< this.beamerDocument.sections.length){
          this.i +=1;
          if(this.beamerDocument.sections[this.i].sub_sections.length>0){
            this.j = 0;
            if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
              this.k = 0;
            }
          }
        } else {
          this.i = this.beamerDocument.sections.length-1;
          if(this.beamerDocument.sections[this.i].sub_sections.length>0){
            this.j = this.beamerDocument.sections[this.i].sub_sections.length-1;
            if(this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length>0){
              this.k = this.beamerDocument.sections[this.i].sub_sections[this.j].sub_sub_sections.length-1;
            }
          }

        }
      }
    }

  console.log(this.i,this.j,this.k);
  }




  begin_beamer(){
    this.beamerDocument = new document_beamer;
    this.beamerDocument.title = this.latexDocument.title;
    this.beamerDocument.sections = [];

    // CECI EST POUR TRANSFERER LES TITRES DES PARTIES
    for(var i = 0; i<this.latexDocument.sections.length; i++){
      if(this.latexDocument.sections[i].isChecked){
        var section = new section_beamer()
        section.title = this.latexDocument.sections[i].title;
        for(var j = 0; j<this.latexDocument.sections[i].sub_sections.length; j++){
          if(this.latexDocument.sections[i].sub_sections[j].isChecked){
            var sub_section = new sub_section_beamer()
            sub_section.title = this.latexDocument.sections[i].sub_sections[j].title;
            for(var k = 0; k<this.latexDocument.sections[i].sub_sections[j].sub_sub_sections.length; k++){
              if(this.latexDocument.sections[i].sub_sections[j].sub_sub_sections[k].isChecked){
                var sub_sub_section = new sub_sub_section_beamer()
                sub_sub_section.title = this.latexDocument.sections[i].sub_sections[j].sub_sub_sections[k].title;
                sub_section.sub_sub_sections.push(sub_sub_section);
              }
            }
            section.sub_sections.push(sub_section);
          }
        }
        this.beamerDocument.sections.push(section);
      }
    }
    //CECI EST POUR INITIALISER LES i, j ET k
    for(var i = 0; i<this.beamerDocument.sections.length; i++){
      var found = false;
      if(this.beamerDocument.sections[i].sub_sections.length == 0){
        this.i = i;
        this.j = -1;
        this.k = -1;
        found = true;
      } else {
        for(var j = 0; j<this.latexDocument.sections[i].sub_sections.length; j++){
          if(this.beamerDocument.sections[i].sub_sections[j].sub_sub_sections.length == 0){
            this.i = i;
            this.j = j;
            this.k = -1;
            found = true;
          } else {
            this.k = 0;
            found = true;
            break;
          }
          if(found){
            break;
          }
        }

      }
      if(found){
        break;
      }
    }
    console.log(this.i, this.j, this.k);
  }



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


class sub_sub_section_beamer {
  title: string;
  text: string[];
  isChecked : boolean;
  type : string;
  constructor(){
    this.title = "";
    this.text=[];
    this.isChecked = false;
    this.type = "sub_sub_section";
  }
}

class sub_section_beamer {
  title: string;
  text: string[];
  isChecked : boolean;
  type : string;
  sub_sub_sections: sub_sub_section_beamer[];
  constructor(){
    this.title = "";
    this.text=[];
    this.isChecked = false;
    this.sub_sub_sections = [];
    this.type = "sub_section";
  }
}

class section_beamer {
  title: string;
  text: string[];
  isChecked : boolean;
  type : string;
  sub_sections: sub_section_beamer[];
  constructor(){
    this.title = "";
    this.text=[];
    this.isChecked = false;
    this.sub_sections = [];
    this.type = "section";
  }
}

class document_beamer {
  title: string;
  id:number;
  sections: section_beamer[];
  constructor(){
    this.title = "";
    this.id = Math.random()* 100000000000000000000;
    this.sections = [];
  }
}
