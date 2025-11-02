import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestsTable } from './service-requests-table';

describe('ServiceRequestsTable', () => {
  let component: ServiceRequestsTable;
  let fixture: ComponentFixture<ServiceRequestsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceRequestsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceRequestsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
