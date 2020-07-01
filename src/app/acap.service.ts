import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AcapService {

  constructor(private httpClient: HttpClient) { }

  passon:any;
  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  getPeople(){
    console.log(this.httpClient.get('http://localhost:3000/getdata'));
    return this.httpClient.get('http://localhost:3000/getdata');
  }
  //http GET request end
  
    //http post request start
    addPerson(data){
      return this.httpClient.post('http://localhost:3000/datasend',JSON.stringify(data),this.httpOptions)
      .subscribe( responseData => {
        console.log(responseData);
  
      });
    }

}
