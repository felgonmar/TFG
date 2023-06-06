import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(public userService:UserService, private snackBar: MatSnackBar, private router: Router, private localStorageService: LocalStorageService){}

  register(){
    var name = (document.getElementById("name") as HTMLInputElement).value;
    var lastname = (document.getElementById("lastname") as HTMLInputElement).value;
    var email = (document.getElementById("email") as HTMLInputElement).value;
    var password = (document.getElementById("password") as HTMLInputElement).value;
    var password_confirm = (document.getElementById("password-confirm") as HTMLInputElement).value;
    console.log(email, password, password_confirm)
    if(this.validateEmail(email) && this.validatePasswordsMatch(password, password_confirm)){
      this.userService.signIn(email, name, lastname,password).subscribe(
        res=>{
          console.log(res)
          this.localStorageService.set('user', res.user);
          this.router.navigate(['/teams']); 
        }, error =>{
          this.snackBar.open('Something went wrong', 'Close',{duration:300})
        }
      )

    }else{
      this.snackBar.open('Wrong data', 'Close',{duration:300})
    }
    name='';
    lastname='';
    email=''
    password =''
    password_confirm = ''

  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  validatePasswordsMatch(password: string, confirmPassword: string): boolean {
    return password === confirmPassword;
  }

}
