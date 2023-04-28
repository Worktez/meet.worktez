import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { map } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  constructor(private functions: AngularFireFunctions) { }

  ngOnInit(): void {
    // this.callMethod()
  }

  // getUser()
  // {
  //   console.log("clikc");
    
  //   const callable = this.functions.httpsCallable("users/getUserByEmail");
  //   const d =  callable({Email: "panda.grass.242@example.com" }).pipe(map(res=>{
  //     const data = res.userData;
  //     console.log(data);
  //     return data
  //   }));
  // }

  callMethod(){
    const callable = this.functions.httpsCallable("tasks/getTasksForDashboard");
    callable({OrgDomain: "testOrg.web.app", FilterAssignee: "panda.grass.242@example.com"}).subscribe((data)=>{
      console.log(data);
    })
}
}
