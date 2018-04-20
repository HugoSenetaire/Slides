import { Component, OnInit } from '@angular/core';
import { ChooseFileComponent , MyService} from '../choose-file/choose-file.component';



@Component({
  selector: 'app-left-window',
  templateUrl: './left-window.component.html',
  styleUrls: ['./left-window.component.css']
})
export class LeftWindowComponent implements OnInit {
   public text:string;

  public constructor(private myService: MyService) {
  	console.log("constructeur fenetre gauche");
  }
  	

  public ngOnInit() {
  	this.myService.myMethod$.subscribe((data) => {
                this.text = data; // And he have data here too!
                console.log("abonnement...")
                console.log(this.text)
            }
        ); 
  	
  }


}
