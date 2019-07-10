import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';    
import { ToastrModule } from 'ngx-toastr';


import { UserloginComponent } from './userlogin/userlogin.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilelistComponent } from './_parts/filelist/filelist.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileviewComponent } from './fileview/fileview.component';

@NgModule({
  declarations: [
    AppComponent,
    UserloginComponent,
    TopBarComponent,
    HomeComponent,
    DashboardComponent,
    FilelistComponent,
    FileuploadComponent,
    FileviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule, BrowserAnimationsModule,  
    ToastrModule.forRoot() 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
