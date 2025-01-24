import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AllSerService } from '../all-ser.service';
import {patient} from '../../../backend/server/routes/patient.js'
import { map } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  userId: string;
  userIsAuthenticated = false;
  // talents: talent[] = [];
  patients: patient[]=[];
  totalCount: number;
  private postsSub: Subscription | undefined;
  router: any;

  constructor(private http:HttpClientModule,private Tservices:AllSerService) { }

  ngOnInit(): void {
    this.Tservices.getPatients();

    this.userId = this.Tservices.getUserId();
    this.postsSub = this.Tservices.talentsUpdatedListener()
    .subscribe((postData:{talents:patient[],talentCount:number})=>{
      console.log(postData.talents);
      console.log(postData.talentCount);
      this.patients=postData.talents;
      this.totalCount= postData.talentCount;
    });
    this.userIsAuthenticated = this.Tservices.getIsAuth();
  }

  logout() {
    this.Tservices.logout();
  }
}
