import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login-handler',
  templateUrl: './login-handler.component.html',
  styleUrls: ['./login-handler.component.css']
})
export class LoginHandlerComponent implements OnInit {
  currentUrl: string;
  userLoggedin: boolean = false;
  userData: any;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = window.location.pathname;
    this.authService.afauth.user.subscribe({
      next:(action)=>{
        if(action)
        {
          this.userData = action;
          this.userLoggedin = true;
        }
      },
      error: (error) => {
        console.error(error);
        if(this.currentUrl == '/')
          this.router.navigate(['']);
      },
      complete: () => console.log("Getting User Data Complete")

    })
  }

  logOut()
  {
    this.authService.logout();
  }

}
