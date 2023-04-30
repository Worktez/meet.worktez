import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { Router } from '@angular/router';
import { log } from 'console';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MeetServiceService } from 'src/app/services/meet/meet-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public meetService: MeetServiceService, public authService: AuthService, private functions:AngularFireFunctions) { }
  date: string;
  email:any  = ''
  userLoggedIn:boolean = false;
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  ngOnInit(): void {
    var temp = new Date();

    this.date = temp.getDate() + 'th ' + this.monthNames[temp.getMonth()] + ' ' + temp.getFullYear();
    this.meetService.isMeetPage = false;
    this.authService.afauth.user.subscribe({
      next:(action)=>{
        const data = action as User;
        this.meetService.getMeetData(data.email!);
        this.userLoggedIn = true;
        this.email = data.email;
      }
    })
  }

  createMeet(){
    let id = "/" + this.randomString(9);
    this.router.navigateByUrl(id);  
  }

  randomString(length: number) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result +=  randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return (result);
}

joinMeet(index: number) {
  this.router.navigate([this.meetService.userMeets[index].RoomId]);
}

 // Delete Meet deletes the meeting for all the users.
 deletedMeet(index:  number) {
  const callable = this.functions.httpsCallable("meet/deleteMeet");
    callable({RoomId: this.meetService.userMeets[index].RoomId}).subscribe({
      next(data: any) { 
       console.log("Meet deleted Successfully") 
      },
      error: (error: any) => {
        console.log("Error", error);
      },
      complete: () => {
        console.info("Successfully updated in db");
        this.meetService.getMeetData(this.email);
      } 
    });
}

// Ignore meet removes the user from the meeting
igonreMeet(index:  number) {
  const callable = this.functions.httpsCallable("meet/ignoreMeet");
    callable({Email: this.email, RoomId: this.meetService.userMeets[index].RoomId}).subscribe({
      next(data: any) { 
       console.log("Meet Ignored Successfully") 
      },
      error: (error: any) => {
        console.log("Error", error);
      },
      complete: () => {
        console.info("Successfully updated in db");
        this.meetService.getMeetData(this.email);
      } 
    });
}
}
