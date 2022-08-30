import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MeetServiceService } from 'src/app/services/meet-service.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.css'],
  
})

export class JitsiComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si"; // For self hosted use your domain
  room: any;
  options: any;
  api: any;
  user: any;
  roomId : string | undefined;

  isAudioMuted = false;
  isVideoMuted = false;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public meetService: MeetServiceService
  ) { }

  ngOnInit(): void {
    this.meetService.isMeetPage = true;
    let roomid = this.route.snapshot.params['id'];
      this.room = "Worktez/" + roomid;
      this.user = {
          name:null // Set your username
      }
  }

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          configOverwrite: { prejoinPageEnabled: true },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

       // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }
  handleClose = () => {
    console.log("handleClose");
}

handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); 
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); 
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); 
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    this.meetService.isMeetPage = false;
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['']);
}

handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}

executeCommand(command: string) {
  this.api.executeCommand(command);;
  if(command == 'hangup') {
    console.log("THis is hit in hangup");
    this.meetService.isMeetPage = false;
      this.router.navigate(['']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}


}