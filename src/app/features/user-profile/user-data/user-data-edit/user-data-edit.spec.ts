import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDataEdit } from './user-data-edit';

describe('UserDataEdit', () => {
  let component: UserDataEdit;
  let fixture: ComponentFixture<UserDataEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDataEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDataEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
