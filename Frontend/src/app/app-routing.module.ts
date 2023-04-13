import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/Events/events.component';
import {LoginComponent} from './components/Form/Login/login.component'
import { RegisterComponent } from './components/Form/Register/register.component';
import { CalendarBodyComponent } from './components/MainPage/CalendarBody/calendar.component';
import { ProfileComponent } from './components/Profile/profile.component';
import { UsersComponent } from './components/Users/users.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'calendar', component: CalendarBodyComponent},
  {path: 'users', component: UsersComponent},
  {path: 'events', component: EventsComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }