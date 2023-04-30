import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';
import { Meet } from 'src/app/interface/MeetInterface';

@Injectable({
  providedIn: 'root'
})
export class MeetServiceService {

  isMeetPage:boolean = false;
  meetDataReady:boolean = false;
  userMeets:Meet[] = []
  constructor(private functions: AngularFireFunctions) { }

  getMeetData(email: string) {
    this.meetDataReady = false;
    const callable = this.functions.httpsCallable("meet/getMeetDetails");
    callable({ Email: email, OnlyToday: true }).pipe(map(actions => { 
      return actions.data as Meet[];
    })).subscribe({
      next: (data) => {
        console.log("meet data", data)
        if (data) {
          this.userMeets = data.reverse();           
          }
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.meetDataReady = true;
          console.info("Fetched Meet Data Successfully");
        }
      })
  }
}
