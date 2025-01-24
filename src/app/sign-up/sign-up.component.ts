import { Component, OnInit } from '@angular/core';
import { User } from './user';
import {
  AbstractControl,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  myForm!: FormGroup;
  private _activatedRoute!: ActivatedRoute;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: '',
      email: '',
      username: '',
      // phone: '',
      password: ''
      // cnfpass: '',
    });
  }
  register() {
    this.http
      .post('https://clinic-health.onrender.com/api/register', this.myForm.getRawValue())
      .subscribe(() => {
        // console.log(res);
        this.router.navigate(['./Login']);
      });

    console.log(this.myForm.getRawValue());
  }

  // movetologin() {
  //   this.router.navigate(['./Login'], { relativeTo: this._activatedRoute });
  // }
}
