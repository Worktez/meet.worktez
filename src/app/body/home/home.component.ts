import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetServiceService } from 'src/app/services/meet-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, public meetService: MeetServiceService) { }

  ngOnInit(): void {
    this.meetService.isMeetPage = false;
  }

  createMeet(){
    let id = "/" + this.randomString(12);
    this.router.navigateByUrl(id);  
  }

  randomString(length: number) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result +=  randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return btoa(result);
}

}
