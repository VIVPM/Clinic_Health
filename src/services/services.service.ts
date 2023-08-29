import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http:HttpClient) { }

  getHeaders(){
    const headers = new Headers();
    headers.append('content-Type','application/json');
    return headers;
  }

  getRequestOptions(){
    // const options =new RequestOptions();
    // options.headers = this.getHeaders();
    // return options;
  }
  get(url:string)
  {
    return this.http.get(url);
  }
  post(url:string, data:any)
  {
    return this.http.post(url,data);
  }
}
