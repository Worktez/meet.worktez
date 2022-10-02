import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { JitsiComponent } from './body/jitsi/jitsi.component';
import { ScheduleMeetComponent } from '../app/body/schedule-meet/schedule-meet.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: ':id', component: JitsiComponent},
  {path: 'jitsi', component: JitsiComponent},
  {path: '', component:HomeComponent},
  {path: 'scheduleMeet', component:ScheduleMeetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
