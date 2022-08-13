import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';

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

//   callMethod(){
//     const callable = this.functions.httpsCallable("tasks/getTasksForDashboard");
//     callable({OrgDomain: "testOrg.web.app", FilterAssignee: "panda.otter.751@example.com"}).subscribe((data)=>{
//       console.log(data);
//     })
// }
}
