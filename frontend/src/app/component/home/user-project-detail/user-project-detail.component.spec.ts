import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectDetailComponent } from './user-project-detail.component';

describe('UserProjectDetailComponent', () => {
  let component: UserProjectDetailComponent;
  let fixture: ComponentFixture<UserProjectDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProjectDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
