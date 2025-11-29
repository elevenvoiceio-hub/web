import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelUsageChart } from './model-usage-chart';

describe('ModelUsageChart', () => {
  let component: ModelUsageChart;
  let fixture: ComponentFixture<ModelUsageChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelUsageChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelUsageChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
