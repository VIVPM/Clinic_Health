import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllSerService } from '../all-ser.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  router: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public Aservice: AllSerService,
    public r:Router,
  ) {}


 players:any[];
 selectedTime: string = '';

  update1(event){
    this.Aservice.update(event);
    this.selectedTime = event.target.value;
    this.players=this.Aservice.getplayers();
  }

  userId: string;
  userIsAuthenticated = false;
  talObj: any;
  myForm!: FormGroup;
  private mode = 'create';
  public talId?: string | null | undefined;
  vlink:boolean = false;


  ngOnInit(): void {
    this.myForm = new FormGroup({
      // id:new FormControl(null,Validators.required),
      name: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      health: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });

    this.talId = this.route.snapshot.paramMap.get('id');
    // this.userIsAuthenticated = this.Aservice.getIsAuth();



    if (this.talId) {
      this.mode = 'edit';
      console.log(this.talId);

      this.Aservice.getPatient(this.talId).subscribe((talData) => {
        // console.log(talData)

        this.talObj = {
          id: talData._id,
          // id:talData.id,
          name: talData.name,
          date: talData.date,
          email: talData.email,
          phone: talData.phone,
          health: talData.health,
          status: talData.status,
        };

        this.myForm.setValue({
          // id:this.talObj.id,
          name: this.talObj.name,
          date: this.talObj.date,
          email: this.talObj.email,
          phone: this.talObj.phone,
          health: this.talObj.health,
          status: this.talObj.status,
        });
      }
      );
    } else {
      console.log(' creating this one');
      this.mode = 'create';
      this.talId = null;
    }



    this.players=this.Aservice.getplayers();

console.log(this.players)
  }

  onSavePost() {
    console.log('button clicked');

    if (this.myForm.invalid) {
      return;
    }

    if (this.mode == 'create') {
      this.Aservice.addPatient(
        this.myForm.value.name,
        this.myForm.value.date,
        this.myForm.value.email,
        this.myForm.value.phone,
        this.myForm.value.health,
        this.myForm.value.status
      );
    } else {
      this.Aservice.updateTalent(
        this.talId,
        this.myForm.value.name,
        this.myForm.value.problem,
        this.myForm.value.solution,
        this.myForm.value.date,
        this.myForm.value.gender,
        this.myForm.value.status
      );
    }
    alert('Patient added Successfully!!');
    this.r.navigate(['/schedule']);
    this.myForm.reset();
  }




}
