import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ImageUploadUIComponent } from './components/image-upload-ui/image-upload-ui.component';
import { UploadImageService } from './upload-image-service';

@NgModule({
  declarations: [
    ImageUploadUIComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [UploadImageService],
  bootstrap: [ImageUploadUIComponent]
})
export class AppModule { }
