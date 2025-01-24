
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllSerService } from './all-ser.service'; // Import the service


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "Clinic";


  constructor(public allSerService: AllSerService) { }

  ngOnInit(): void {
    // Check authentication state on component initialization
    this.allSerService.checkAuthState();
  }

  logout(): void {
    this.allSerService.logout();
  }
}
