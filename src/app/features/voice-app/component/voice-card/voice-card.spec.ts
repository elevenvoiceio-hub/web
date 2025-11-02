import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCard } from './voice-card';

describe('VoiceCard', () => {
  let component: VoiceCard;
  let fixture: ComponentFixture<VoiceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
