import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropUpload } from './drag-drop-upload';

describe('DragDropUpload', () => {
  let component: DragDropUpload;
  let fixture: ComponentFixture<DragDropUpload>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropUpload]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DragDropUpload);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
