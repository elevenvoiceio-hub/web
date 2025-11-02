import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceApp } from './voice-app';

describe('VoiceApp', () => {
  let component: VoiceApp;
  let fixture: ComponentFixture<VoiceApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
