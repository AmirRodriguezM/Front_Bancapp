import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoDialogComponent } from './monto-dialog-component.component';

describe('MontoDialogComponent', () => {
  let component: MontoDialogComponent;
  let fixture: ComponentFixture<MontoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MontoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
