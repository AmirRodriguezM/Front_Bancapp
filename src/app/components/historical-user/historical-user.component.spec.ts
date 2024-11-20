import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalUserComponent } from './historical-user.component';

describe('HistoricalUserComponent', () => {
  let component: HistoricalUserComponent;
  let fixture: ComponentFixture<HistoricalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistoricalUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoricalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
