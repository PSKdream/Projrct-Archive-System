import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNevbarComponent } from './user-nevbar.component';

describe('UserNevbarComponent', () => {
  let component: UserNevbarComponent;
  let fixture: ComponentFixture<UserNevbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNevbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNevbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
