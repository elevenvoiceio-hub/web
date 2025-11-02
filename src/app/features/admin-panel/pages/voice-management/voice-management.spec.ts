import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceManagement } from './voice-management';

describe('VoiceManagement', () => {
  let component: VoiceManagement;
  let fixture: ComponentFixture<VoiceManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
