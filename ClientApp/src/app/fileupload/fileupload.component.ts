import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { FilemanagerService } from '../services/filemanager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(private router: Router,private filemanager: FilemanagerService) { }


  ngOnInit() {
  }
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {

    this.progress.percentage = 0;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.filemanager.uploadFile(this.currentFileUpload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        
        this.progress.percentage = Math.round(100 * event.loaded / event.total);

      } else if (event instanceof HttpResponse) {
        
        console.log('File is completely uploaded!');
        
        this.router.navigate(["dashboard"]).then( (e) => {
          if (e) {
            console.log("导航到仪表盘成功!");
          } else {
            console.log("导航到仪表盘失败!");
          }
        });  

      }
    });

    this.selectedFiles = undefined;
  }

}
