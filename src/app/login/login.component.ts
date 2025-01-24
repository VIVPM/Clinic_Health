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
import { AllSerService } from '../all-ser.service';
import { config } from '../config'; // Import the config

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
    private router: Router,
    private allSerService: AllSerService
  ) { }


  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      email: '',
      password: ''
    });
  }

  submit(): void {
    const email = this.myForm.get('email').value;
    const password = this.myForm.get('password').value;

    // Check against the config values
    if (email === config.email && password === config.password) {
      this.allSerService.loginUser1();
      this.router.navigate(['/schedule']);
    } else {
      this.http.post('https://clinic-health.onrender.com/api/login', this.myForm.getRawValue(), {
        // withCredentials: true
      }).subscribe({
        next: (response: any) => {
          console.log('Login response:', response);
          this.allSerService.loginUser2();
          this.router.navigate(['/schedule']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          alert('Invalid credentials. Please try again.');
        }
      });
    }
  }

  logout() {
    this.allSerService.logout();
  }

}
