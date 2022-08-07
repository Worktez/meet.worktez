import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JitsiComponent } from './body/jitsi/jitsi.component';

const routes: Routes = [
  {path: 'jitsi', component: JitsiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
