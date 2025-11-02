import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsVoiceCard } from './tts-voice-card';

describe('TtsVoiceCard', () => {
  let component: TtsVoiceCard;
  let fixture: ComponentFixture<TtsVoiceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtsVoiceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsVoiceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
