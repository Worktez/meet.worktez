import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { JitsiComponent } from './body/jitsi/jitsi.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: ':id', component: JitsiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
