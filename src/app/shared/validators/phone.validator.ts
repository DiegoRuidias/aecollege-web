import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PhoneValidator(): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';
    const phonePattern = /^9\d{8}$/; 

    if(value.length===0){
      return null;
    }
    if (!phonePattern.test(value)) {
      return { invalidFormat: 'El número debe comenzar con 9' };
    }

    return null;
  };
}

