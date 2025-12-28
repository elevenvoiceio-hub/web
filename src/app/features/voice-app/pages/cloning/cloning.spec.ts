import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cloning } from './cloning';

describe('Cloning', () => {
  let component: Cloning;
  let fixture: ComponentFixture<Cloning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cloning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cloning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
