import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var jQuery:any;

@Component({
  selector: 'app-add-attendee',
  templateUrl: './add-attendee.component.html',
  styleUrls: ['./add-attendee.component.css']
})
export class AddAttendeeComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  @Input("title") title: string;
  @Input("attendees") attendees: string[];
  @Input("hostName") hostName: string;
  @Input("description") description: string;
  @Input("isUpdateMeet") isUpdateMeet:boolean
  @Output() addedAttendee = new EventEmitter<{completed: boolean, attendeeEmail: string }>();
  
  componentName: string = "ADD-ATTENDEE";
  attendeeEmail:string;
  showClose: boolean = false;
  enableLoader: boolean
  add: boolean = false;

  constructor( private functions: AngularFireFunctions, private router: Router) { }

  ngOnInit(): void {
    console.log(this.title);
  }

  added(){
    jQuery('#attendeeModal').modal('hide');
    jQuery('#form').trigger("reset");
    this.addedAttendee.emit({ completed: true, attendeeEmail: this.attendeeEmail});
  }

  submit(){
    if(this.attendeeEmail){
      if(this.isUpdateMeet == true){
        this.addUpdateMeet();
      } else {
        this.addScheduledMeet();
      }
    }
  }

  addUpdateMeet(){
    this.enableLoader= true;
    const callable = this.functions.httpsCallable('meet/addAttendeeAtWorktez');
    callable({Title: this.title, Description: this.description, HostName: this.hostName, Add: this.attendeeEmail}).subscribe({
      next: (data) => {
        this.enableLoader = false;
        this.showClose = true;
        console.log("Successfully added attendee");
      },
      error: (error) => {
        this.enableLoader = false;
        console.error("Error", error);
      },
      complete: () => console.info('Successfully added attendee')
    })
  }

  addScheduledMeet() {
    this.add = true;
    this.showClose = true;
  }

}
