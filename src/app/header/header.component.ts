import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeetServiceService } from '../services/meet-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public meetService: MeetServiceService, private router:Router) { }

  ngOnInit(): void {
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
