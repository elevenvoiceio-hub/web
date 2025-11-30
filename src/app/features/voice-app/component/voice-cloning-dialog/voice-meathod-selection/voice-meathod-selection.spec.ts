import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceMeathodSelection } from './voice-meathod-selection';

describe('VoiceMeathodSelection', () => {
  let component: VoiceMeathodSelection;
  let fixture: ComponentFixture<VoiceMeathodSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceMeathodSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceMeathodSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
