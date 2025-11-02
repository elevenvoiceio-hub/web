import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceAppMenu } from './voice-app-menu';

describe('VoiceAppMenu', () => {
  let component: VoiceAppMenu;
  let fixture: ComponentFixture<VoiceAppMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceAppMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceAppMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
