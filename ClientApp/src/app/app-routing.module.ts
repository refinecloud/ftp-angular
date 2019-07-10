import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { componentFactoryName } from '@angular/compiler';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { FileviewComponent } from './fileview/fileview.component';

const routes: Routes = [
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path:'login',component:UserloginComponent
  },
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'upload',component:FileuploadComponent
  },
  {
    path:'file',component:FileviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
