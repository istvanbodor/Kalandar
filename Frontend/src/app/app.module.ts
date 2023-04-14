import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Form/Login/login.component';
import { NgbModule, NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/Link_layout/layout.component';
import { RegisterComponent } from './components/Form/Register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/Users/users.component';
import { IsAdminPipe, IsFullDay } from './components/CustomPipe/CustomPipe';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarBodyComponent } from './components/MainPage/CalendarBody/calendar.component';
import { EventsComponent } from './components/Events/events.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileComponent } from './components/Profile/profile.component';
import { EventsModalComponent } from './components/MainPage/Modals/EventsModal/eventsModal.component';
import { addEventModalComponent } from './components/MainPage/Modals/AddEventModal/addEventModal.component';
import { CalendarHeaderComponent } from './components/MainPage/CalendarHeader/calendarHeader.component';
import { UpdateEventModalComponent } from './components/MainPage/Modals/UpdateEventModal/updateEventModal.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    RegisterComponent,
    UsersComponent,
    addEventModalComponent,
    CalendarBodyComponent,
    IsAdminPipe,
    IsFullDay,
    EventsComponent,
    ProfileComponent,
    EventsModalComponent,
    CalendarHeaderComponent,
    UpdateEventModalComponent,
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
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
