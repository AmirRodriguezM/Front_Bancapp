import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Módulos de rutas de la aplicación
import { AppRoutingModule } from './app-routing.module';

// Componentes principales de la aplicación
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewAdminUserComponent } from './components/view-admin-user/view-admin-user.component';
import { ViewDashboardAdminComponent } from './components/view-dashboard-admin/view-dashboard-admin.component';
import { CrudAdminAdminComponent } from './components/crud-admin-admin/crud-admin-admin.component';
import { CrudAdminUserComponent } from './components/crud-admin-user/crud-admin-user.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

// Módulos de Angular Material y Bootstrap
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Módulos de Angular Forms y HTTP
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// Módulo de animaciones para Toastr
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Módulos de Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgregarEditarAdminUsuarioComponent } from './components/agregar-editar-admin-usuario/agregar-editar-admin-usuario.component';
import { AuthInterceptor } from './auth.interceptor';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AgregarEditarClientUsuarioComponent } from './components/agregar-editar-client-usuario/agregar-editar-client-usuario.component';
import { EditarClientUsuarioComponent } from './components/editar-client-usuario/editar-client-usuario.component';
import { RouterModule } from '@angular/router';
import { CrudAdminProductComponent } from './components/crud-admin-product/crud-admin-product.component';
import { AgregarEditarProductosComponent } from './components/agregar-editar-productos/agregar-editar-productos.component';
import { ViewUserUserComponent } from './components/view-user-user/view-user-user.component';
import { AccountUserComponent } from './components/account-user/account-user.component';
import { TransaccionUserComponent } from './components/transaccion-user/transaccion-user.component';
import { HistoricalUserComponent } from './components/historical-user/historical-user.component';
import { MontoDialogComponent } from './components/monto-dialog-component/monto-dialog-component.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    SpinnerComponent,
    ViewAdminUserComponent,
    ViewDashboardAdminComponent,
    CrudAdminAdminComponent,
    CrudAdminUserComponent,
    AgregarEditarAdminUsuarioComponent,
    AgregarEditarClientUsuarioComponent,
    EditarClientUsuarioComponent,
    CrudAdminProductComponent,
    AgregarEditarProductosComponent,
    ViewUserUserComponent,
    AccountUserComponent,
    TransaccionUserComponent,
    HistoricalUserComponent,
    MontoDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSliderModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
  
  
})
export class AppModule { }
