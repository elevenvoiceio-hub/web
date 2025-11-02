import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceCloningCard } from './voice-cloning-card';

describe('VoiceCloningCard', () => {
  let component: VoiceCloningCard;
  let fixture: ComponentFixture<VoiceCloningCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceCloningCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceCloningCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
