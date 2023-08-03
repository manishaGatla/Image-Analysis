import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class UploadImageService {

    constructor(private http: HttpClient) {}
    public imgDesc : string ="";
    baseurl = "http://localhost:3200"
  
    public uploadImage(image: File): Observable<Object> {
      const formData = new FormData();
  
      formData.append('file', image, image.name);
        
      // Make http post request over api
      // with formData as req
      return this.http.post(this.baseurl +"/upload", formData);

      
    }

    public getUploadedFileDescription(type: any){
      return this.http.get(this.baseurl + "/getData?type=" + type);
    }
  }