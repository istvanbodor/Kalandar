import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/Form/Login/login.component'
import { RegisterComponent } from './components/Form/Register/register.component';
import { MainPageComponent } from './components/MainPage/main-page.component';
import { UsersComponent } from './Service/users.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'mainpage', component: MainPageComponent},
  {path: 'users', component: UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//login.component