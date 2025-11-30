import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceUploadSample } from './voice-upload-sample';

describe('VoiceUploadSample', () => {
  let component: VoiceUploadSample;
  let fixture: ComponentFixture<VoiceUploadSample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceUploadSample]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceUploadSample);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
