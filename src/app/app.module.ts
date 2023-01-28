import { NgModule } from '@angular/core';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/compat/functions';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatInputModule } from '@angular/material/input';

import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { JitsiComponent } from './body/jitsi/jitsi.component';
import { HomeComponent } from './body/home/home.component';
import { ScheduleMeetComponent } from'../app/body/schedule-meet/schedule-meet.component';
import { AddAttendeeComponent } from '../app/body/schedule-meet/add-attendee/add-attendee.component';
import { LoaderComponent } from './body/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    JitsiComponent,
    HomeComponent,
    ScheduleMeetComponent,
    AddAttendeeComponent,
    LoaderComponent,
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireFunctionsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost:9099'] : undefined },
    { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', '7002'] : undefined },
    { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', '7001'] : undefined },
    { provide: REGION, useValue: 'asia-south1' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
