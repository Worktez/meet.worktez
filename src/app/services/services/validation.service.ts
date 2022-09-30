import { Injectable } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  componentName: string = "";

  constructor() { }

  validation(label: any, value: any) {
    switch (label) {
      case 'title': {
        return this.checkTitle(value);
      }
      case 'description': {
        return (this.checkDescription(value));
      }
      case 'startTime': {
        return(this.checkStartTime(value));
      }
      case 'endTime' : {
          return(this.checkEndTime(value));
      }
    }
    return 
  }

  async checkValidity(componentName: string, data: any[]) {
    var valid = 0;
    this.componentName = componentName;
    for(const element of data){
      var condition = await this.validation(element.label, element.value)?.then(res => {
        return res;
      });
      if (condition) {
        valid += 1;
      } else {
        break;
      }
    }
    if (valid == data.length)
        return (true);
    else
        return (false);
}

  async checkTitle(value: String) {
    const control = new UntypedFormControl(value, Validators.required);
    if (control.errors == null)
      return (true);
    else {
      let errorType = this.componentName + "_VALIDATION_TITLE";
      console.error("Title field is requred");
      return(false);
    }
  }

  async checkDescription(value: String){
    const control = new UntypedFormControl(value, Validators.required);
    if (control.errors === null)
      return (true);
    else {
      let errorType = this.componentName + "_VALIDATION_DESCRIPTION";
      return(false);
    }
  }

  async checkStartTime(value: String) {
    const control = new UntypedFormControl(value, Validators.required);
    const regularExpression = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    const result = regularExpression.test(String(value));
    if (control.errors === null && result == true)
        return (true);
    else {
        console.log(this.componentName);
        let errorType = this.componentName + "_VALIDATION_STARTTIME";
        return (false);
    }
}

async checkEndTime(value: String) {
    const control = new UntypedFormControl(value, Validators.required);
    const regularExpression = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    const result = regularExpression.test(String(value));
    if (control.errors === null && result == true)
        return (true);
    else {
        console.log(this.componentName);
        let errorType = this.componentName + "_VALIDATION_STARTTIME";
        return (false);
    }
}


}
