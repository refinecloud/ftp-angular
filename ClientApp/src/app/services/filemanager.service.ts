import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FileInfo } from '../models/FileInfo';
import { DirectoryStack } from '../models/DirectoryStack';
import { FileContentInfo } from '../models/FileContentInfo';
import { OperateResult } from '../models/OperateResult';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class FilemanagerService {

  /** 目录输出 */
  _lsUrl: string = "api/Document/List?subpath=";

  /**文件内容读取 */
  _readfileUrl:string = "api/Document/ReadFile";

  _uploadOneUrl:string = "api/Document/UploadOne?subpath="

  _createDirectoryUrl:string = "api/Document/CreateDirectory";

  _deleteDirectoryUrl:string = "api/Document/DeleteDirectory";

  _updateFileContentUrl:string = "api/Document/UpdateFileContent";

  _deleteFileUrl = "api/Document/DeleteFile";

  _downloadFileUrl = "api/Document/DownloadFile";


  /**目录队列 */
  directorystack: DirectoryStack = new DirectoryStack();
  
  /**是否根目录 */  
  isRoot: boolean = true;


  /**当前目录路径 */
  directoryPath:string = "";

  /**当前文件路径 */
  filePath:string = "";

  //----------file-------------
  /**文件名 */
  fileName:string = "";


  constructor(private http: HttpClient) {

  }

  //查询当前文件夹子中的文件和目录
  list(): Observable<FileInfo[]> {

    this.directoryPath = this.directorystack.subpath();
    
    return this.http.get<FileInfo[]>(this._lsUrl + this.directoryPath);
  }


  //下钻到子文件夹
  openDirectory(directoryName: string): void {
    this.directorystack.push(directoryName);

    if (this.directorystack.subpath())
      this.isRoot = false;
    else
      this.isRoot = true;
  }


  openFile(fileName:string):void
  { 
    this.fileName = fileName;

    this.filePath = this.directoryPath + "/" + this.fileName;
  }

  readFile(): Observable<FileContentInfo> {

    this.directoryPath = this.directorystack.subpath();
    
    return this.http.post<FileContentInfo>(this._readfileUrl, 
      {subpath:this.directoryPath,
        filename:this.fileName},
        httpOptions);
  }
  
  backFromFile():void
  {
    this.fileName = "";
  }

  //返回到父目录
  backFromDirectory(): void {

    this.directorystack.pop();

    if (this.directorystack.subpath())
      this.isRoot = false;
    else
      this.isRoot = true;
  }


  uploadFile(file: File): Observable<HttpEvent<{}>> {

    //alert(this.navUrl);

    const formdata: FormData = new FormData();

    formdata.append('file', file);
    
    const req = new HttpRequest('POST', this._uploadOneUrl + this.directoryPath, formdata, {
      reportProgress: true,
      responseType: 'json'
    });
    
    return this.http.request(req);
  }

  createDirectory(directoryname:string):Observable<OperateResult>{
    this.directoryPath = this.directorystack.subpath();

    return this.http.post<OperateResult> (this._createDirectoryUrl,
       {
        subpath: this.directoryPath,
        directoryname: directoryname
      },
    httpOptions);
  }
  
  deleteDirectory(directoryname:string):Observable<OperateResult>{
    this.directoryPath = this.directorystack.subpath();

    return this.http.post<OperateResult> (this._deleteDirectoryUrl,
       {
        subpath: this.directoryPath,
        directoryname: directoryname
      },
    httpOptions);
  }

  deleteFile():Observable<OperateResult>{

    return this.http.post<OperateResult>(
      this._deleteFileUrl,{
        subpath:this.directoryPath,
        filename:this.fileName
      },
    httpOptions);
  }

  downloadFile():Observable<any>
  { 
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //headers.append('responseType', 'arrayBuffer');
    
    var httpOptions2 = {
      headers: headers,
      responseType: 'blob' 
    };

    return this.http.post(
      this._downloadFileUrl,
      { 
        subpath:this.directoryPath,
        filename:this.fileName
      },
      {
        headers:headers,
        observe: 'response',
        responseType:'blob'
      }
      );
  }

  updateFileContent(content:string):Observable<OperateResult>{

    this.directoryPath = this.directorystack.subpath();
    
    return this.http.post<OperateResult>(
      this._updateFileContentUrl,
      {
        subpath:this.directoryPath,
        filename:this.fileName,
        content:content
      },
      httpOptions
      );
  }



}
