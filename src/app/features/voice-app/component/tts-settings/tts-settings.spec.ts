import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtsSettings } from './tts-settings';

describe('TtsSettings', () => {
  let component: TtsSettings;
  let fixture: ComponentFixture<TtsSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtsSettings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtsSettings);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
