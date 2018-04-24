import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LeftWindowComponent } from './components/left-window/left-window.component';
import { RightWindowComponent } from './components/right-window/right-window.component';
import { ChooseFileComponent} from './components/choose-file/choose-file.component';
import { ChoosePartsComponent } from './components/choose-parts/choose-parts.component';
import { HeaderComponent } from './components/header/header.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DndModule } from 'ngx-drag-drop';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule,MatIconModule} from "@angular/material";

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

// Services
import { UploadService } from './services/upload/upload.service'
import { DataService } from './services/data/data.service'

const appRoutes: Routes = [
  {path:'', component:ChooseFileComponent},
  {path:'parts', component:ChoosePartsComponent},
  {path:'main', component:MainComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LeftWindowComponent,
    RightWindowComponent,
    ChooseFileComponent,
    ChoosePartsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    DndModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [
    UploadService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class PizzaPartyAppModule { }
