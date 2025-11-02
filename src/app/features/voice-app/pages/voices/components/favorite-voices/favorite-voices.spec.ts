import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteVoices } from './favorite-voices';

describe('FavoriteVoices', () => {
  let component: FavoriteVoices;
  let fixture: ComponentFixture<FavoriteVoices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteVoices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteVoices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
