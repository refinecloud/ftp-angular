import { Component, OnInit } from '@angular/core';
import { FilemanagerService } from 'src/app/services/filemanager.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-fileview',
  templateUrl: './fileview.component.html',
  styleUrls: ['./fileview.component.css']
})
export class FileviewComponent implements OnInit {

  content:string = "";
  isReadonly:boolean = true;
  isBinary:boolean = true;

  public checkoutForm;

  constructor(
    private formBuilder:FormBuilder,
    public fileService:FilemanagerService,
    private router: Router) { }

  ngOnInit() {

    this.checkoutForm = this.formBuilder.group({
      content: ''
    });

    this.fileService.readFile().subscribe(
      result => {
        
        if(result.isBinary == false)
        {
          this.isBinary = false;

          this.checkoutForm = this.formBuilder.group({
            content: result.content
          });

        }else
        {
          this.isBinary = true;
          //this.content = "二进制文本，不支持预览";
          this.checkoutForm = this.formBuilder.group({
            content: "二进制文本，不支持预览"
          });
        }

      }
    );
  }
  
  edit(editable:boolean):void
  {
    
    if(editable)
      this.isReadonly = false;
    else
      this.isReadonly = true;
  }

  submit():void
  { 
    var c = this.checkoutForm.controls["content"];
    //console.log(c);
    
    this.fileService.updateFileContent(c.value)
    .subscribe(result=>{
      if(result.success)
        this.return();
    });  
  }
  delete():void
  { 
    this.fileService.deleteFile()
      .subscribe(result=>{
        if(result.success)
          this.return();
      });
  }
  download():void
  {
    this.fileService.downloadFile()
    .subscribe(response =>{
      var blob = response.body;
      console.log(response);
      console.log(blob);
      var fileName = response.headers.get("Content-Disposition").split(";")[1].split("filename=")[1];
      console.log(fileName);
      var filetype = response.headers.get('Content-Type');
      
      saveAs(blob,fileName);

    });

  }
  return():void
  {
    this.fileService.fileName = "";
      
    this.router.navigate(["dashboard"]).then( (e) => {
      if (e) {
        console.log("导航到仪表盘成功!");
      } else {
        console.log("导航到仪表盘失败!");
      }
    });

  }

}
