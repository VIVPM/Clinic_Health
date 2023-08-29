import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, map } from 'rxjs';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AllSerService {
  token: any;
  select: any;
  // players:any[];

  getplayers()
  {
    return this.players;
  }

  
players = [
  '09:00-09:30 AM',
  '09:30-10:00 AM',
  '10:00-10:30 AM',
  '10:30-11:00 AM',
  '11:00-11:30 AM',
  '11:30-12:00 AM',
  '12:00-12:30 PM',
  '12:30-01:00 PM',
  '03:00-03:30 PM',
  '03:30-04:00 PM',
  '04:00-04:30 PM',
  '04:30-05:00 PM',
];

  constructor(private http:HttpClient, private router:Router) { } 

  private talentsUpdated = new Subject<{talents:user[],talentCount:number}>(); 
  handlerError:any; 
  private talents2:user[]=[]; 
  private userId:string | undefined;
  private isAuthenticated= false;
  private authStatusListener = new Subject<boolean>();


  update(event) {

    // console.log(event.value);

    let select: any =event.target.value;

    // console.log(select)

    this.players.forEach((item: any, index: any) => {
      if (item === select) {
        this.players.splice(index, 1);
      }
      else{
        this.select = event.target.value;
      }
    });
    
  }
 
 
  addTalent(name:string,problem:string,solution:string,date:string,gender:string,status:string) 
  { 
    const postData = new FormData(); 
    // postData.append("id",id); 
    postData.append("name",name); 
    postData.append("problem",problem); 
    postData.append("solution",solution); 
    postData.append("date",date); 
    postData.append("gender",gender); 
    postData.append("status",status); 
    
    // console.log(postData.get("id"));
    console.log(postData.get("name"));
    console.log(postData.get("gender"));
    console.log(postData.get("status"));
    console.log(postData.get("date"));
    console.log(postData.get("solution"));
    console.log(postData);
    const values={};
    // values["id"]=postData.get("id");
    values["name"]=postData.get("name");
    values["status"]=postData.get("status");
    values["gender"]=postData.get("gender");
    values["problem"]=postData.get("problem");
    values["solution"]=postData.get("solution");
    values["date"]=postData.get("date");
    this.http.post<{message:string,talent:any}>('http://localhost:3000/api/talents',values) 
    .subscribe(responceData=>{ 
      console.log(responceData.message); 
      console.log(responceData.talent); 
    })
    
  } 
  getUserId(){

    return this.userId;
  }
 
  getTalent(id:string) 
  { 
    return this.http.get<{
      _id:string,name:string,problem:string,solution:string,date:number,gender:string,status:false
}>("http://localhost:3000/api/talents/"+id); 
  } 
 
  deleteTalents(id:string) 
  { 
    return this.http.delete("http://localhost:3000/api/talents/"+id); 
  } 
 
  getTalents( ){ 
 
    this.http.get<{message:string,talents:any,maxTalents:number}>('http://localhost:3000/api/talents' ) 
    .pipe(map((postData)=>{ 
      console.log(postData); 
      return {posts : postData.talents.map((post:any)=>{ 
        return { 
          id:post._id, 
          name:post.name, 
          problem:post.problem, 
          solution:post.solution, 
          date:post.date, 
          gender:post.gender, 
          status:post.status 
        }; 
      }),maxTalents:postData.maxTalents}; 
    }) 
    ) 
    .subscribe(transformedPostData=>{ 
      console.log(transformedPostData); 
      this.talents2=transformedPostData.posts; 
      this.talentsUpdated.next({talents:[...this.talents2],talentCount:transformedPostData.maxTalents}); 
    }); 
  } 
 
  talentsUpdatedListener() 
  { 
    return this.talentsUpdated.asObservable(); 
  } 
  getIsAuth()
  {
    return this.isAuthenticated;
  }
 
  updateTalent(id:string,name:string,problem:string,solution:string,date:string,gender:string,status:false){ 
 
    let TalData: FormData|user; 
 
    TalData = { 
        id:id, 
        name:name, 
        problem:problem, 
        solution:solution, 
        date:date, 
        gender:gender, 
        status:status 
      } 
 
  this.http.put("http://localhost:3000/api/talents/"+id,TalData) 
  .subscribe(responce=>{ 
    console.log(responce)
  },error=>{
    console.log(error)
  }) 
}


addPatient(name:string,date:string,email:string,phone:string,health:string,status:string) 
  { 
    const postData = new FormData(); 
    // postData.append("id",id); 
    postData.append("name",name); 
    postData.append("date",date); 
    postData.append("email",email); 
    postData.append("phone",phone); 
    postData.append("health",health); 
    postData.append("status",status); 
    
    // console.log(postData.get("id"));
    console.log(postData.get("name"));
    console.log(postData.get("date"));
    console.log(postData.get("status"));
    console.log(postData.get("phone"));
    console.log(postData.get("health"));
    console.log(postData.get("email"));
    console.log(postData);
    const values={};
    // values["id"]=postData.get("id");
    values["name"]=postData.get("name");
    values["status"]=postData.get("status");
    values["health"]=postData.get("health");
    values["email"]=postData.get("email");
    values["phone"]=postData.get("phone");
    values["date"]=postData.get("date");
    this.http.post<{message:string,patient:any}>('http://localhost:3000/api/patients/appoinment',values) 
    .subscribe(responceData=>{ 
      console.log(responceData.message); 
      console.log(responceData.patient); 
    })
    
  } 
getPatients( ){ 
 
  this.http.get<{message:string,talents:any,maxTalents:number}>('http://localhost:3000/api/patients' ) 
  .pipe(map((postData)=>{ 
    console.log(postData); 
    return {posts : postData.talents.map((post:any)=>{ 
      return { 
        id:post._id, 
        name:post.name, 
        date:post.date, 
        email:post.email, 
        phone:post.phone,  
        health:post.health,
        status:post.status 
      }; 
    }),maxTalents:postData.maxTalents}; 
  }) 
  ) 
  .subscribe(transformedPostData=>{ 
    console.log(transformedPostData); 
    this.talents2=transformedPostData.posts; 
    this.talentsUpdated.next({talents:[...this.talents2],talentCount:transformedPostData.maxTalents}); 
  }); 
} 
getPatient(id:string) 
{ 
  return this.http.get<{
    _id:string,name:string,date:string,email: string,phone:string,health:string,status:false
}>("http://localhost:3000/api/patients/"+id); 
} 
logout(){ 
  this.token=null; 
  this.isAuthenticated=false; 
  this.authStatusListener.next(false); 
  this.router.navigate(['/Home']); 
}
}
