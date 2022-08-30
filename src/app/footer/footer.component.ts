import { Component, OnInit } from '@angular/core';
import { MeetServiceService } from '../services/meet-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public meetService: MeetServiceService) { }

  ngOnInit(): void {
  }

}
