import { Injectable } from '@angular/core';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private serve:ServicesService) { }

  registerUser(){

  }

  authenticateUser(){
    
  }
}
