import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const startDate = control.get('yearStart')?.value;
    const endDate = control.get('yearEnd')?.value;

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { 'invalidDate': true };
    }

    if (startDate && new Date(startDate).getMonth() !== 0) {
      return { 'startMonthDate': true };
    }

    if (endDate && new Date(endDate).getMonth() !== 11) {
      return { 'endMonthDate': true };
    }

    if (startDate && endDate && new Date(startDate).getFullYear() !== new Date(endDate).getFullYear()){
      return { 'yearDate': true}
    }

    return null; 
  };
}