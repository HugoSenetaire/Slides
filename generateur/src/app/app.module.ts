import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LeftWindowComponent } from './components/left-window/left-window.component';
import { RightWindowComponent } from './components/right-window/right-window.component';
import { ChooseFileComponent } from './components/choose-file/choose-file.component';
import { ChoosePartsComponent } from './components/choose-parts/choose-parts.component';
import { HeaderComponent } from './components/header/header.component';

// Services
import { UploadService } from './services/upload.service'

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
    FormsModule
  ],
  providers: [
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
