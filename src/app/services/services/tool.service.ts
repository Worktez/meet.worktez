import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  todayDate: string

  constructor() { }

  date(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth()+1).padStart(2, '0');
    var yyyy = today.getFullYear();
    return this.todayDate = dd + "/" + mm + "/" + yyyy;
  }
}
