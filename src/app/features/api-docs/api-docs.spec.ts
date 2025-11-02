import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiDocs } from './api-docs';

describe('ApiDocs', () => {
  let component: ApiDocs;
  let fixture: ComponentFixture<ApiDocs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiDocs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiDocs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
