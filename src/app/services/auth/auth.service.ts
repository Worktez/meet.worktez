import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user:any;
  token:any;
  public userName:string = "";
  constructor(public afauth: AngularFireAuth, private functions: AngularFireFunctions) { }

  async createUser(email: string, password: string, username: string) {
    await this.afauth.createUserWithEmailAndPassword(email, password);
    this.user = firebase.auth().currentUser;
    this.user.updateProfile({
      displayName: username
    }).then(() => {
      this.createUserData(this.user);
    }).catch((err: any) => {
      console.log(err);
    });
  }

  async loginUser(email: string, password: string) {
    await this.afauth.signInWithEmailAndPassword(email, password);
  }

  createUserData(user: any) {
    const callable = this.functions.httpsCallable('users/createNewUser');
    callable({ uid: user.uid, photoURL: user.photoURL, displayName: user.displayName, email: user.email, phoneNumber: user.phoneNumber, providerId: user.providerId }).subscribe({
      next: (data) => {
        console.log("Successful ");
      },
      error: (error) => {
        console.error("Error", error);
      },
      complete: () => console.info('Successful ')
    });

  }
  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afauth.signInWithPopup(provider);
    console.log(credential.user);
    
    this.user = credential.user;
    return this.createUserData(credential.user);
  }

  async logout() {
    await this.afauth.signOut();
    location.reload();
  }

  getUserEmail(){
    return this.user.email;
  }

  getLoggedInUser() {
    return this.user.uid;
  }
}
