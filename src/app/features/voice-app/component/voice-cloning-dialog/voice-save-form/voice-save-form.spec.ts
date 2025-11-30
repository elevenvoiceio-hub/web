import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceSaveForm } from './voice-save-form';

describe('VoiceSaveForm', () => {
  let component: VoiceSaveForm;
  let fixture: ComponentFixture<VoiceSaveForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceSaveForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceSaveForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
