import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServiceRequests } from './edit-service-requests';

describe('EditServiceRequests', () => {
  let component: EditServiceRequests;
  let fixture: ComponentFixture<EditServiceRequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditServiceRequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditServiceRequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
