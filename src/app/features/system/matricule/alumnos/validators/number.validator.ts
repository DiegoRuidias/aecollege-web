import { AbstractControl, ValidatorFn } from '@angular/forms';

export function NumberValidator(maxLength: number): ValidatorFn {
  const dniPattern = new RegExp("[A-Z0-9]+$");

  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value || '';

    if (!dniPattern.test(value)) {
      return { invalidFormat: 'Formato incorrecto' };
    }

    if((value.length !== maxLength)){
      return { invalidLength: `Debe tener 8 caracteres` };
    }

    return null;
  };
}
