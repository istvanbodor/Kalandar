import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {

  static MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceCtrl = control.get(source);
      const targetCtrl = control.get(target);

      return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
        ? { mismatch: true }
        : null;
    };
  }
  static IsBiggerDateValidator(start: string, end: string): ValidatorFn{
    return(control: AbstractControl): ValidationErrors | null => {
      const startCtrl = control.get(start);
      const endCtrl = control.get(end);

      if (startCtrl && endCtrl && startCtrl.value && endCtrl.value) {
        const startDate = new Date(startCtrl.value);
        const endDate = new Date(endCtrl.value);
  
        return startDate > endDate ? null : { badVal: true };
      }      
      return null;
    };
  }
}