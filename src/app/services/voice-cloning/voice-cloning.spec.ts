import { TestBed } from '@angular/core/testing';
import { VoiceCloning } from '../../features/voice-app/pages/voice-cloning/voice-cloning';


describe('VoiceCloning', () => {
  let service: VoiceCloning;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceCloning);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
