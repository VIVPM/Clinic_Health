import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllSerService } from '../all-ser.service';
// import { AddtalentService } from '../addtalent.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import { AuthServiceService } from 'src/app/authentication/auth-service.service';
import { talent } from '../../../backend/server/routes/Talent.js';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  // styleUrls: ['./style.css']
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  userId: string;
  userIsAuthenticated = false;
  talents: talent[] = [];
  totalCount: number;
  private postsSub: Subscription | undefined;
  // router: any;
  vlink: boolean = false;



  constructor(private http: HttpClientModule, private Tservices: AllSerService, private router: Router) { }

  ngOnInit(): void {

    this.Tservices.getTalents();

    this.userId = this.Tservices.getUserId();
    this.postsSub = this.Tservices.talentsUpdatedListener()
    .subscribe((postData:{talents:talent[],talentCount:number})=>{
      console.log(postData.talents);
      console.log(postData.talentCount);
      this.talents=postData.talents;
      this.totalCount= postData.talentCount;
    });
    this.userIsAuthenticated = this.Tservices.getIsAuth();
  }
  logout()
  {
    this.Tservices.logout();
  }

  // Check(){
  //   if(talent.status == 'Video Call'){
  //     this.vlink = true;
  //     //this.vlink = new URL("https://zegocloud.github.io/zego_uikit_prebuilt_web/video_conference/index.html?roomID=lg1HL&role=Host")

  //   }
  // }

  Delete(Id: string) {
    this.Tservices.deleteTalents(Id).subscribe(
      () => {
        this.Tservices.getTalents();
        setTimeout(() => {
          this.router.navigate(['/display']);
        }, 3000);
      }
    );
  }

}
