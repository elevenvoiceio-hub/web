import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiManagement } from './ai-management';

describe('AiManagement', () => {
  let component: AiManagement;
  let fixture: ComponentFixture<AiManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiManagement],
    }).compileComponents();

    fixture = TestBed.createComponent(AiManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
