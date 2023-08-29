import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent implements OnInit {
Onfile(event: any) {
  console.log(event)
}

 
userModel = new User('Suraj','M','N','','',0,0,'','../doctor-profile/med.jpg');

  constructor() { }

  onSubmit(){
    console.log("Success");
  }

  ngOnInit(): void {
  }

}
