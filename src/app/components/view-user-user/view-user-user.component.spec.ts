import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserUserComponent } from './view-user-user.component';

describe('ViewUserUserComponent', () => {
  let component: ViewUserUserComponent;
  let fixture: ComponentFixture<ViewUserUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewUserUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
