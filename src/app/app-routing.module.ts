import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { NewCountryComponent } from './new-country/new-country.component';
import { CountryListComponent } from './country-list/country-list.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { NewRoleComponent } from './new-role/new-role.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { HomeComponent } from './home/home.component';
import { Error404Component } from './error404/error404.component';
import { authenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'error404',component:Error404Component},
  {path:'home',component:HomeComponent,canActivate:[authenticationGuard], children:[
      {path:'NewPatient',component:NewPatientComponent},
      {path:'PatientList',component:PatientListComponent},
      {path:'NewCountry',component:NewCountryComponent},
      {path:'CountryList',component:CountryListComponent},
      {path:'CreateAccount',component:CreateAccountComponent},
      {path:'NewRole',component:NewRoleComponent},
      {path:'UserList',component:UserListComponent},
      {path:'userRoles',component:UserRolesComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
