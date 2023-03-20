import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/Events/events.component';
import {LoginComponent} from './components/Form/Login/login.component'
import { RegisterComponent } from './components/Form/Register/register.component';
import { CalendarDayComponent } from './components/MainPage/CalendarDay/calendarDay.component';
import { CalendarMonthComponent } from './components/MainPage/CalendarMonth/calendar.component';
import { CalendarWeekComponent } from './components/MainPage/CalendarWeek/calendarWeek.component';
import { MainPageComponent } from './components/MainPage/main-page.component';
import { UsersComponent } from './Service/users.component';
const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'calendar/month', component: CalendarMonthComponent},
  {path: 'calendar/week', component: CalendarWeekComponent},
  {path: 'calendar/day', component: CalendarDayComponent},
  {path: 'users', component: UsersComponent},
  {path: 'events', component: EventsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//login.component