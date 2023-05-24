import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  constructor(public userService:UserService, private snackBar: MatSnackBar, private router: Router){}

  login(): void {
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;
  
    const email = emailInput.value;
    const password = passwordInput.value;
  
    this.userService.login(email, password).subscribe(
      res => {
        console.log(res);
        // Assuming the response has a message property
        if (res.status === 200) {
          this.router.navigate(['/teams']);  
        } else {
          this.snackBar.open(res.message, 'Cerrar', {duration: 3000});
        }
      },
      error => {
        // This will handle any network / server errors
        this.snackBar.open('Ha ocurrido un error durante el inicio de sesión.', 'Cerrar', {duration: 3000});
      }
    )
  
    emailInput.value = "";
    passwordInput.value = "";
  }
}
