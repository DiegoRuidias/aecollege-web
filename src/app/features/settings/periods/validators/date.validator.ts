import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('yearStart')?.value;
    const endDate = control.get('yearEnd')?.value;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return { 'invalidDate': true };
    }

    return null; 
  };
}