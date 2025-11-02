import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVoices } from './all-voices';

describe('AllVoices', () => {
  let component: AllVoices;
  let fixture: ComponentFixture<AllVoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllVoices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllVoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
