import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import {UploadImageService} from '../../upload-image-service';
@Component({
  selector: 'app-image-upload-ui',
  templateUrl: './image-upload-ui.component.html',
  styleUrls: ['./image-upload-ui.component.scss']
})
export class ImageUploadUIComponent implements OnInit {
  constructor(public UploadImageService : UploadImageService) { }

  public urlOfImage:string = '';
  public selectedFile:any ;
  public showImg:boolean =false;
  public uploadClicked:boolean = false;
  type: any;

  ngOnInit(): void {
  }

  selectFile(imageInput: any) {
    this.uploadClicked = false;
    this.showImg= false;
    this.urlOfImage="";
    const selectedfile: File = imageInput.files[0];
    this.selectedFile = {
      file :selectedfile
    };
    var reader = new FileReader();
    reader.readAsDataURL(selectedfile);
    
    this.type = selectedfile.type;
    reader.onload = (res :any)=>{
      if(selectedfile.type !== "text/plain"){
        this.urlOfImage = res.target.result;
      }
    }
}

IsDisable(){
  return this.selectedFile =='' || this.selectedFile == undefined || 
  (this.selectedFile && (this.selectedFile.file == '' || this.selectedFile.file == undefined))
}

  onUploadBtnClicked(){
    this.uploadClicked = true;
    this.showImg = true;
    this.UploadImageService.uploadImage(this.selectedFile.file).subscribe(res => {
      // this.UploadImageService.imgDesc = res.toString();
      // this.showImg= true;
      
    });
  }

  onBackBtn(){
    this.uploadClicked = false;
    this.urlOfImage = "";
    this.selectedFile = null;
    this.UploadImageService.imgDesc = "";
  }

  getData(){
    this.UploadImageService.getUploadedFileDescription(this.type).subscribe((res: any) =>{
      this.UploadImageService.imgDesc = res;
    })
  }
}
