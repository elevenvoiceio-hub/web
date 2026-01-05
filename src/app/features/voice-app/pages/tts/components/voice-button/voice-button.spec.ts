import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceButton } from './voice-button';

describe('VoiceButton', () => {
  let component: VoiceButton;
  let fixture: ComponentFixture<VoiceButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
