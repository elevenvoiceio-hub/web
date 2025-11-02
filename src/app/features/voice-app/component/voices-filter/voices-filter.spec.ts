import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicesFilter } from './voices-filter';

describe('VoicesFilter', () => {
  let component: VoicesFilter;
  let fixture: ComponentFixture<VoicesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoicesFilter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicesFilter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
