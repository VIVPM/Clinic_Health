import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AllSerService } from './all-ser.service'; // Import the service


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "Clinic";
  private inactivityTime: any;


  constructor(public allSerService: AllSerService) { }

  ngOnInit(): void {
    // Check authentication state on component initialization
    this.allSerService.checkAuthState();
    this.resetTimer(); // Start the timer on initialization
  }

  // Function to reset the timer
  resetTimer() {
    clearTimeout(this.inactivityTime);
    this.inactivityTime = setTimeout(() => {
      this.logout(); // Call logout after 1 hour of inactivity
    }, 3600000); // 1 hour in milliseconds
  }

  logout(): void {
    this.allSerService.logout();
  }

  // Listen for user activity
  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:keypress', ['$event'])
  onUserActivity(event: Event) {
    this.resetTimer(); // Reset the timer on user activity
  }
}
