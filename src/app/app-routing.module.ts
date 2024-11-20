import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewDashboardAdminComponent } from './components/view-dashboard-admin/view-dashboard-admin.component';
import { ViewAdminUserComponent } from './components/view-admin-user/view-admin-user.component';
import { CrudAdminProductComponent } from './components/crud-admin-product/crud-admin-product.component';
import { ViewUserUserComponent } from './components/view-user-user/view-user-user.component';
import { AccountUserComponent } from './components/account-user/account-user.component';
import { TransaccionUserComponent } from './components/transaccion-user/transaccion-user.component';
import { HistoricalUserComponent } from './components/historical-user/historical-user.component';




import { CrudAdminAdminComponent } from './components/crud-admin-admin/crud-admin-admin.component';
import { CrudAdminUserComponent } from './components/crud-admin-user/crud-admin-user.component';
// Configuración de las rutas
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sign-in', component: SignInComponent },
  {
    path: 'dashboardUser',
    component: DashboardComponent,
    children: [
      { path: 'viewUserUser', component: ViewUserUserComponent },
      { path: 'viewUserAccount', component: AccountUserComponent },
      { path: 'viewUserTransaction', component: TransaccionUserComponent },
      { path: 'viewUserHistorical', component: HistoricalUserComponent },
      { path: '', redirectTo: 'viewUserUser', pathMatch: 'full' }
    ]
  },
  {
    path: 'dashboardAdmin',
    component: ViewDashboardAdminComponent,
    children: [
      { path: 'viewAdminUser', component: ViewAdminUserComponent },
      { path: 'viewCrudAdmin', component: CrudAdminAdminComponent },
      { path: 'viewCrudUser', component: CrudAdminUserComponent },
      { path: 'viewCrudProduct', component: CrudAdminProductComponent },
      { path: '', redirectTo: 'viewAdminUser', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
