import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCloning } from './voice-cloning';

describe('VoiceCloning', () => {
  let component: VoiceCloning;
  let fixture: ComponentFixture<VoiceCloning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCloning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceCloning);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
