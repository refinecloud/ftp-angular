import { Component, OnInit } from '@angular/core';
import { FilemanagerService } from 'src/app/services/filemanager.service';
import { FileInfo } from 'src/app/models/FileInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  fileInfoList:FileInfo[] = [];

  constructor(
    public fileService:FilemanagerService,
    private router: Router) { }

  ngOnInit() {

    this.list();
  }

  list()
  {
    this.fileService.list().subscribe(
      result => {
        this.fileInfoList = result;
      }
    );
  }
  return()
  {
    this.fileService.backFromDirectory();
    this.fileService.list().subscribe(
      result => {
        this.fileInfoList = result;
      }
    );
    
  }


  select(sub)
  {
    if(sub.type == "directory")
    {
      this.fileService.openDirectory(sub.name);
      
      this.fileService.list().subscribe(
        result => {
          this.fileInfoList = result;
        }
      );
    }
    else
    { 
      this.fileService.openFile(sub.name);

      this.router.navigate(["file"]).then( (e) => {
        if (e) {
          console.log("导航到文件查看成功!");
        } else {
          console.log("导航到文件查看失败!");
        }
      });  
      
    }
    
    
  }
  
  createdirectory()
  {
    var name = prompt("请输入目录名称","");
    if(name)
    {
      this.fileService.createDirectory(name).subscribe(result =>{
        if(result.success)
        {
          this.list();
        }
      });
    }
  }


}
