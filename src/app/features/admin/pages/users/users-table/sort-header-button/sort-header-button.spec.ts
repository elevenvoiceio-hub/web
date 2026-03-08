import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortHeaderButton } from './sort-header-button';

describe('SortHeaderButton', () => {
  let component: SortHeaderButton;
  let fixture: ComponentFixture<SortHeaderButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortHeaderButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortHeaderButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
