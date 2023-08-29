import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DoctorComponent } from './doctor/doctor.component';
import { VideoComponent } from './video/video.component';
import { DoctorProfileComponent } from './doctor-profile/doctor-profile.component';
import { AddPatientComponent } from './add-patient/add-patient.component';
import { AboutComponent } from './about/about.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { DisplayComponent } from './display/display.component';
import { ScheduleComponent } from './schedule/schedule.component';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'Home',component:HomeComponent},
  {path:'Appointment',component:AppointmentComponent},
  {path:'add-patient',component:AddPatientComponent},
  {path:'add-patient/:id',component:AddPatientComponent},
  {path:'Login',component:LoginComponent},
  {path:'SignUp',component:SignUpComponent},
  {path:'Doctor',component:DoctorComponent},
  {path:'Video',component:VideoComponent},
  {path:'DoctorProfile',component:DoctorProfileComponent},
  {path:'about',component:AboutComponent},
  {path:'display',component:DisplayComponent},
  {path:'schedule',component:ScheduleComponent}
  // {path:'',redirectTo:'/Home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
