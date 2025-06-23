import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const emailPattern = /.*@.*\..*/; 

    if(value===""){
      return null;
    }
    if (!emailPattern.test(value)) {
      return { invalidFormat: 'Formato incorrecto' };
    }

    return null;
  };
}
