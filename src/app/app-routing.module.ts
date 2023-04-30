import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './body/home/home.component';
import { JitsiComponent } from './body/jitsi/jitsi.component';
import { LoginComponent } from './body/login/login.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectToHome = () => redirectLoggedInTo(['']);
const redirectHome = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: '', component:HomeComponent},
  { path: "login", component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectToHome } },
  {path: ':id', component: JitsiComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectHome }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
