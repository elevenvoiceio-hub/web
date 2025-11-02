import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCards } from './plan-cards';

describe('PlanCards', () => {
  let component: PlanCards;
  let fixture: ComponentFixture<PlanCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
