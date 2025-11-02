import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCloningDialog } from './voice-cloning-dialog';

describe('VoiceCloningDialog', () => {
  let component: VoiceCloningDialog;
  let fixture: ComponentFixture<VoiceCloningDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCloningDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceCloningDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
