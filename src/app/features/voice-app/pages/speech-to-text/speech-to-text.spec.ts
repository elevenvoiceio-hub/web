import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechToText } from './speech-to-text';

describe('SpeechToText', () => {
  let component: SpeechToText;
  let fixture: ComponentFixture<SpeechToText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeechToText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeechToText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
