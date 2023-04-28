import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string
  password: string
  username: string
  showPassword: boolean = false
  componentName: string = "LOGIN"

  activeLogin: boolean = true
  userExistChecked=false;

  constructor(public authService: AuthService, public router: Router, private location: Location) { }

  ngOnInit(): void {
    this.authService.afauth.user.subscribe((data) => {
      this.userExistChecked=true;
    })
  }

  onSignInWithGoogle() {
    this.authService.googleSignIn().then(() => {
      const path = this.location.path();
        this.navigateToHome();
    }).catch((err) => {
      console.log(err);
    });
  }

  onLogOut() {
    this.authService.logout().then(() => {
      this.navigateToHome();
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSignUpWithEmail() {
    this.authService.createUser(this.email, this.password, this.username).then(() => {
      this.navigateToHome();
    }).catch((err) => {
      console.log(err.message);
    });
  }

  onLoginWithEmail() {
    this.authService.loginUser(this.email, this.password).then(() => {
      const path = this.location.path();
        this.navigateToHome();
    }).catch((err) => {
      console.log(err.message);
    });
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
  

  changeTab() {
    this.activeLogin = !this.activeLogin;
  }
}
