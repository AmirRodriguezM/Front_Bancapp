import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionUserComponent } from './transaccion-user.component';

describe('TransaccionUserComponent', () => {
  let component: TransaccionUserComponent;
  let fixture: ComponentFixture<TransaccionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransaccionUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
