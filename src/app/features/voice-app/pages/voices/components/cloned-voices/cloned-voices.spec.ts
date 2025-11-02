import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClonedVoices } from './cloned-voices';

describe('ClonedVoices', () => {
  let component: ClonedVoices;
  let fixture: ComponentFixture<ClonedVoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClonedVoices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClonedVoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
