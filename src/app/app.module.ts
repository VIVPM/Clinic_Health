import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DoctorComponent } from './doctor/doctor.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import {HttpClient, HttpClientModule} from'@angular/common/http'
import { ServicesService } from 'src/services/services.service';
import { AuthService } from 'src/services/auth.service';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { DocHomeComponent } from './doc-home/doc-home.component';
import { AboutComponent } from './about/about.component';
import { DisplayComponent } from './display/display.component';
import { ScheduleComponent } from './schedule/schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorComponent,
    AppointmentComponent,
    LoginComponent,
    SignUpComponent,
    VideoComponent,
    HomeComponent,
    DoctorProfileComponent,
    AddPatientComponent,
    UpdatePatientComponent,
    DocHomeComponent,
    AboutComponent,
    DisplayComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ServicesService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
