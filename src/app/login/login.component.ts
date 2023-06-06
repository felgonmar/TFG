import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(public userService:UserService, private snackBar: MatSnackBar, private router: Router, private localStorageService: LocalStorageService){}

  login(): void {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
    this.snackBar.open('vamono', 'Cerrar', {duration: 3000})
    const email = emailInput.value;
    const password = passwordInput.value;
  
    this.userService.login(email, password).subscribe(res=>{
      if(res.user){
        this.localStorageService.set('user', res.user);
        this.router.navigate(['/teams']);  
        
      }else{
        this.snackBar.open('Credenciales invalidas.', 'Cerrar', {duration: 3000});

      }
    },error=>{
      this.snackBar.open('Ha ocurrido un error durante el inicio de sesión.', 'Cerrar', {duration: 3000});

    })
  
    emailInput.value = "";
    passwordInput.value = "";
  }
}
