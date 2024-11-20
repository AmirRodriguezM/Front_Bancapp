import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDashboardAdminComponent } from './view-dashboard-admin.component';

describe('ViewDashboardAdminComponent', () => {
  let component: ViewDashboardAdminComponent;
  let fixture: ComponentFixture<ViewDashboardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewDashboardAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDashboardAdminComponent);
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
