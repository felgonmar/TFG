import { Injectable } from '@angular/core';
import { baseUrl } from './config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    const user = this.localStorageService.get('user');
    if (user) {
      this.userSubject.next(user);
    }
   }

   login(email:string, password: string){
    let body={'email':email, 'password':password};
    return this.http.post<any>(`${baseUrl}/accounts/login/`, body).pipe(
      tap(res => {
        if(res.user) {
          this.localStorageService.set('user', res.user);
          this.userSubject.next(res.user);
        }
      })
    );
  }


  

  logout(){
    this.localStorageService.remove('user')
    this.userSubject.next(null)
    return this.http.get<any>(`${baseUrl}/logout/`)
  }

  signIn(email:string, name:string, lastName:string, password:string){
    let body={'email':email,
    'password':password,
    'name':name,
    'last_name': lastName}
    return this.http.post<any>(`${baseUrl}/register/`, body).pipe(
      tap(res => {
        if(res.user) {
          this.localStorageService.set('user', res.user);
          this.userSubject.next(res.user);
        }
      })
    );

  }

  get_user(){
    return this.userSubject.value;
  }

}
