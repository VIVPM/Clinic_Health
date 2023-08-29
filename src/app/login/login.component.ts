import { Component, OnInit } from '@angular/core';
// import { User } from './user';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm!: FormGroup;
  private _activatedRoute!: ActivatedRoute;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }
  submit(): void {
    this.http.post('http://localhost:3000/api/login', this.myForm.getRawValue(), {
      withCredentials: true
    }).subscribe(() => this.router.navigate(['/display']));
    // alert("Invalid credentials");
  }

}
