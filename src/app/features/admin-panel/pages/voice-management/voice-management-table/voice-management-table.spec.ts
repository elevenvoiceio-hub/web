import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceManagementTable } from './voice-management-table';

describe('VoiceManagementTable', () => {
  let component: VoiceManagementTable;
  let fixture: ComponentFixture<VoiceManagementTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceManagementTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceManagementTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
