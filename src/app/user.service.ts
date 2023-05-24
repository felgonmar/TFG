import { Injectable } from '@angular/core';
import { baseUrl } from './config';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  login(email:string, password: string){
    let body={'email':email,
          'password':password}
    return this.http.post<LoginResponse>(`${baseUrl}/login/`, body)
  }

  

  logout(){

  }

  signIn(){

  }

  get_user(){
    
  }
}

interface LoginResponse {
  status: number;
  message: string;
}