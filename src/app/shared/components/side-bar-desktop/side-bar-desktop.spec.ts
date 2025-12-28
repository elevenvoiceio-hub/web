import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarDesktop } from './side-bar-desktop';

describe('SideBarDesktop', () => {
  let component: SideBarDesktop;
  let fixture: ComponentFixture<SideBarDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarDesktop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarDesktop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
