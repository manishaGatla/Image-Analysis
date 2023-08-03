import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploadUIComponent } from './image-upload-ui.component';

describe('ImageUploadUIComponent', () => {
  let component: ImageUploadUIComponent;
  let fixture: ComponentFixture<ImageUploadUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploadUIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageUploadUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
