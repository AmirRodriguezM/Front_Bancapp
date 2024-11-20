import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the menu state', () => {
    // Estado inicial
    expect(component.isCollapsed).toBe(false);

    // Simula el clic para colapsar
    component.toggleMenu();
    expect(component.isCollapsed).toBe(true);

    // Simula el clic para expandir
    component.toggleMenu();
    expect(component.isCollapsed).toBe(false);
  });
});
