import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupHandlerService {

  scheduleMeetEnabled: boolean = false

  constructor() { }

  resetPopUps(){
    this.scheduleMeetEnabled = false;
  }
}