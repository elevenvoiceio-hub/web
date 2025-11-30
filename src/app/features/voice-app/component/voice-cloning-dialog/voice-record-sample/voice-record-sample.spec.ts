import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceRecordSample } from './voice-record-sample';

describe('VoiceRecordSample', () => {
  let component: VoiceRecordSample;
  let fixture: ComponentFixture<VoiceRecordSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceRecordSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceRecordSample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
