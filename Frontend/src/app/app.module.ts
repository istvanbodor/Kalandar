import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Form/Login/login.component';
import { NgbModule,NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/Link_layout/layout.component';
import { RegisterComponent } from './components/Form/Register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './Service/users.component';
import { IsAdminPipe, IsFullDay } from './components/CustomPipe/CustomPipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarMonthComponent } from './components/MainPage/CalendarMonth/calendar.component';
import { CalendarWeekComponent } from './components/MainPage/CalendarWeek/calendarWeek.component';
import { CalendarDayComponent } from './components/MainPage/CalendarDay/calendarDay.component';
import { EventsComponent } from './components/Events/events.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProfileComponent } from './components/Profile/profile.component';
import { EventsModalComponent } from './components/MainPage/Modals/EventsModal/eventsModal.component';
import { EventModalComponent } from './components/MainPage/Modals/AddEventModal/eventModal.component';
import { CalendarHeaderComponent } from './components/MainPage/CalendarHeader/calendarHeader.component';
import { UpdateEventModalComponent } from './components/MainPage/Modals/UpdateEventModal/updateEventModal.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    UsersComponent,
    EventModalComponent,
    CalendarMonthComponent,
    CalendarWeekComponent,
    CalendarDayComponent,
    IsAdminPipe,
    IsFullDay,
    EventsComponent,
    ProfileComponent,
    EventsModalComponent,
    CalendarHeaderComponent,
    UpdateEventModalComponent
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
    NgbDropdownModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
