import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AllSerService } from '../all-ser.service';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {

  constructor( private http:HttpClient ,private route:ActivatedRoute,public Aservice:AllSerService,private router:Router){}

  userId:string;
  userIsAuthenticated = false;
  talObj:any;
  myForm!:FormGroup;
  private mode ='create';
  public talId?:string |null| undefined;

  ngOnInit(): void {

    this.myForm = new FormGroup({
      // id:new FormControl(null,Validators.required),
      name: new FormControl(null,Validators.required),
      problem: new FormControl(null, Validators.required),
      solution: new FormControl(null, Validators.required),
      date:new FormControl((new Date()).toISOString().substring(0,10)),
      gender: new FormControl(null, Validators.required),
      status:new FormControl(null, Validators.required)
    })

    this.talId  = this.route.snapshot.paramMap.get('id');
    this.userIsAuthenticated = this.Aservice.getIsAuth();

      if(this.talId){
        this.mode = 'edit';
        console.log(this.talId)

        this.Aservice.getTalent(this.talId)
        .subscribe(talData=>{
          // console.log(talData)

         this.talObj= {
          id: talData._id,
          // id:talData.id,
          name:talData.name,
          problem:talData.problem,
          solution:talData.solution,
          date:talData.date,
          gender:talData.gender,
          status:talData.status
         };

         this.myForm.setValue({
          // id:this.talObj.id,
          name:this.talObj.name,
          problem:this.talObj.problem,
          solution:this.talObj.solution,
          date:this.talObj.date,
          gender:this.talObj.gender,
          status:this.talObj.status
        })
})
      }else{
        console.log(" creating this one")
        this.mode='create';
        this.talId=null;
      }
    }

    onSavePost(){
      console.log("button clicked")

      if(this.myForm.invalid)
      {
        return;
      }
      if(this.mode=='create')
      {
        this.Aservice.addTalent( this.myForm.value.name,this.myForm.value.problem,this.myForm.value.solution,this.myForm.value.date,this.myForm.value.gender,this.myForm.value.status);
        alert("Patient Details added Successfully!!");
      }else{
        this.Aservice.updateTalent(this.talId,this.myForm.value.name,this.myForm.value.problem,this.myForm.value.solution,this.myForm.value.date,this.myForm.value.gender,this.myForm.value.status);
        alert("Patient Details updated Successfully!!");
      }
      // alert("Patient added Successfully!!");
      this.router.navigate(['/display']);

      this.myForm.reset();
    }


}

