import { Component, Input, OnInit } from '@angular/core';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private httpClientService : HttpClientService,
    private alertifyService : AlertifyService,
    private customToastrService : CustomToastrService 
  ) {}

  @Input() options : Partial<FileUploadOptions>

  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData : FormData = new FormData();

    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      })

      this.httpClientService.post({
        controller : this.options.controller,
        action : this.options.action,
        queryString : this.options.queryString,
        headers : new HttpHeaders({"responseType":"blob"})
      }, fileData).subscribe(data => {

        if(this.options.isAdminPage){

        }
        else{

        }


      }, (errorResponse : HttpErrorResponse) => {

        if(this.options.isAdminPage){

        }
        else{

        }

      });

    }

  }

}

export class FileUploadOptions{
  controller? : string;
  action? : string;
  queryString? : string;
  explanation? : string;
  accept? : string;
  isAdminPage? : boolean = false
}