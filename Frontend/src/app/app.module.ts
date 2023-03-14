import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Form/Login/login.component';
import { NgbModule,NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/Layout/layout.component';
import { RegisterComponent } from './components/Form/Register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPageComponent } from './components/MainPage/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './Service/users.component';
import { YesNoPipe } from './components/CustomPipe/CustomPipe';
import { EventModalComponent } from './components/MainPage/EventModal/eventModal.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/MainPage/CalendarMonth/calendar.component';
import { CalendarWeekComponent } from './components/MainPage/CalendarWeek/calendarWeek.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    MainPageComponent,
    UsersComponent,
    EventModalComponent,
    CalendarComponent,
    CalendarWeekComponent,
    YesNoPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbDropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
