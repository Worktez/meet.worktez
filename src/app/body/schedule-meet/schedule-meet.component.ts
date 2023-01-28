import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { NgForm, UntypedFormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/services/validation.service';
import { ToolService } from 'src/app/services/services/tool.service';
@Component({
  selector: 'app-schedule-meet',
  templateUrl: './schedule-meet.component.html',
  styleUrls: ['./schedule-meet.component.css']
})
export class ScheduleMeetComponent implements OnInit {
  hostName = new UntypedFormControl();
  attendeeEmails = new UntypedFormControl();


  @ViewChild('form') form: NgForm
  @Output() meetScheduled = new EventEmitter<
  { completed: boolean }>();

  componentName: string = "SCHEDULE-MEET";
  todayDate: string;
  enableLoader: boolean = false;
  isUpdateMeet: boolean = false;
  showClose: boolean = false
  addAttendeeEnabled: boolean =false;
  date: string;
  time: string;
  description: string;
  title: string;
  attendees: string[] = []
  project: string = "";
  estimatedTimeHrs: number;
  estimatedTimeHrs1: number;
  totalEstimatedTime: number;
  link: string;
  attendeeEmailsArray: string[] =[]
  scheduleMeetEnabled: boolean=false;

  constructor(private functions: AngularFireFunctions, public validationService: ValidationService, public toolsService: ToolService) { }

  ngOnInit(): void {
    this.todayDate = this.toolsService.date();
    this.attendeeEmails.setValue("");
  }

  submit(){
    const attendeeEmails1 = this.attendeeEmails.value;
    this.attendeeEmailsArray = attendeeEmails1.split(", ");
    this.createNewMeet()
    // let data = [{ label: "title", value: this.title}, 
    //             {label: "description", value: this.description}, 
    //             {label: "startTime" , value: startTime},
    //             {label: "endTime" , value: endTime} ];
    //             // {label: "hostName", value: this.hostName.value}, 
    //             // {label: "date", value: this.date},
    //             // {label: "teamMembers", value: this.teamMembers} ];
    //             console.log(data, this.componentName);
    // var condition = await (this.validationService.checkValidity(this.componentName, data)).then(res => {
    //   return res;
    // })    
    // if(condition){
    //   console.log("Inputs are valid");
    //   this.createNewMeet();
    // } else{
    //   console.log("Meet not scheduled! Validation error");
    // }
    
  }

  addAttendee(){
    this.addAttendeeEnabled = true;
  }

  selectedHost(item: { selected: boolean; data: any; }){
    if (item.selected == false) {
      this.hostName.setValue("");
      this.close();
    } else {
      this.hostName.setValue(item.data);
    }
  }

  addedAttendee(data: {completed: boolean, attendeeEmail: string}){
    if(data.attendeeEmail){
      this.attendees.push(data.attendeeEmail);
    }
    this.addAttendeeEnabled = false;
  }

  removeAttendee(remove: string){
    const index = this.attendees.indexOf(remove);
    if(index != -1){
      this.attendees.splice(index, 1);
    } else {
      console.error("Error - Cannot remove attendee. Attendee not found");
    }
  }

  createNewMeet(){
    const startTime = this.estimatedTimeHrs;
    const endTime = this.estimatedTimeHrs1;
    const callable = this.functions.httpsCallable('meet/scheduleMeet'); 
    callable({TeamMembers: this.attendeeEmailsArray, Description:this.description, HostName: this.hostName.value, StartTime: startTime, EndTime :endTime, Date: this.date, Title: this.title, TeamId: "", OrgDomain: "", Uid: ""}).subscribe({
      next: (data) => {
        console.log(data);
        this.enableLoader = false;
        this.showClose = true;
        console.log("Successfully scheduled meet");
      },
      error: (error) => {
        console.error("Error");
      },
      complete: () => {
        console.info('successfully scheduled meet')
      }
    })
  }

  scheduleMeet(){
    this.scheduleMeetEnabled = true;
  }

  generateLink(){
    this.link ="https://meet.jit.si/"+ this.title +"/Meet-woktez";
    return this.link;
  }

  close(){
    this.scheduleMeetEnabled=false;
    this.meetScheduled.emit({ completed: true });
    window.location.reload();
  }

}
