import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiManagementCards } from './ai-management-cards';

describe('AiManagementCards', () => {
  let component: AiManagementCards;
  let fixture: ComponentFixture<AiManagementCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiManagementCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiManagementCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
