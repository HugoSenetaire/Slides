import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-choose-parts',
  templateUrl: './choose-parts.component.html',
  styleUrls: ['./choose-parts.component.css']
})
export class ChoosePartsComponent implements OnInit {
  fileTitle : string;
  id : number;
  userDocument: document;

  constructor(private dataService: DataService) {
    this.dataService.currentId.subscribe(id => this.id = id);
    this.dataService.currentTitle.subscribe(title => this.fileTitle = title);
    this.userDocument = new document();
    console.log(this.fileTitle);
    this.json2us();
  }

  ngOnInit() {
  }

  json2us(){
    this.dataService.getJson(17)
      .then(data => {
        console.log(data);
        this.userDocument.title = this.fileTitle;
        let nbr_sections = (data as any).sections.length;
        for(var i=0; i<nbr_sections; i++){
          let _section = new section();
          _section.title = (data as any).sections[i].title;
          _section.text = (data as any).sections[i].text;
          let nbr_sub_sections = (data as any).sections[i].sub_sections.length;
          for(var j=0; j<nbr_sub_sections; j++){
            let _sub_section = new sub_section();
            _sub_section.title = (data as any).sections[i].sub_sections[j].title;
            _sub_section.text = (data as any).sections[i].sub_sections[j].text;
            let nbr_sub_sub_sections = (data as any).sections[i].sub_sections.length;
            for(var k=0; k<nbr_sub_sub_sections; k++){
              let _sub_sub_section = new sub_sub_section();
              _sub_sub_section.title = (data as any).sections[i].sub_sections[j].sub_sub_sections[k].title;
              _sub_sub_section.text = (data as any).sections[i].sub_sections[j].sub_sub_sections[k].text;
              this.userDocument.sections[i].sub_sections[j].sub_sub_sections.push(_sub_sub_section);
            }
            this.userDocument.sections[i].sub_sections.push(_sub_section);
          }

          this.userDocument.sections.push(_section);
        }
        console.log(this.userDocument);
      })
      .catch(error => {
        console.log(error);
      })
  }

  us2json(){

  }
}

class sub_sub_section {
  title: string;
  text: string;
  constructor(){
    this.title = "";
    this.text="";
  }
}

class sub_section {
  title: string;
  text: string;
  sub_sub_sections: sub_sub_section[];
  constructor(){
    this.title = "";
    this.text="";
  }
}

class section {
  title: string;
  text: string;
  sub_sections: sub_section[];
  constructor(){
    this.title = "";
    this.text="";
  }
}

class document {
  title: string;
  sections: section[];
  constructor(){
    this.title = "";
  }
}



// angular.module("demo").controller("NestedListsDemoController", function($scope) {

//     $scope.models = {
//         selected: null,
//         templates: [
//             {type: "item", id: 2},
//             {type: "container", id: 1, columns: [[], []]}
//         ],
//         dropzones: {
//             "A": [
//                 {
//                     "type": "container",
//                     "id": 1,
//                     "columns": [
//                         [
//                             {
//                                 "type": "item",
//                                 "id": "1"
//                             },
//                             {
//                                 "type": "item",
//                                 "id": "2"
//                             }
//                         ],
//                         [
//                             {
//                                 "type": "item",
//                                 "id": "3"
//                             }
//                         ]
//                     ]
//                 },
//                 {
//                     "type": "item",
//                     "id": "4"
//                 },
//                 {
//                     "type": "item",
//                     "id": "5"
//                 },
//                 {
//                     "type": "item",
//                     "id": "6"
//                 }
//             ],
//             "B": [
//                 {
//                     "type": "item",
//                     "id": 7
//                 },
//                 {
//                     "type": "item",
//                     "id": "8"
//                 },
//                 {
//                     "type": "container",
//                     "id": "2",
//                     "columns": [
//                         [
//                             {
//                                 "type": "item",
//                                 "id": "9"
//                             },
//                             {
//                                 "type": "item",
//                                 "id": "10"
//                             },
//                             {
//                                 "type": "item",
//                                 "id": "11"
//                             }
//                         ],
//                         [
//                             {
//                                 "type": "item",
//                                 "id": "12"
//                             },
//                             {
//                                 "type": "container",
//                                 "id": "3",
//                                 "columns": [
//                                     [
//                                         {
//                                             "type": "item",
//                                             "id": "13"
//                                         }
//                                     ],
//                                     [
//                                         {
//                                             "type": "item",
//                                             "id": "14"
//                                         }
//                                     ]
//                                 ]
//                             },
//                             {
//                                 "type": "item",
//                                 "id": "15"
//                             },
//                             {
//                                 "type": "item",
//                                 "id": "16"
//                             }
//                         ]
//                     ]
//                 },
//                 {
//                     "type": "item",
//                     "id": 16
//                 }
//             ]
//         }
//     };

//     $scope.$watch('models.dropzones', function(model) {
//         $scope.modelAsJson = angular.toJson(model, true);
//     }, true);

// });
