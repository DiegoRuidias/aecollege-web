import { FormGroup } from "@angular/forms";

export const markAllAsTouched = (formGroup: FormGroup) => {
    Object.keys(formGroup.controls).forEach(key => {
        const control = formGroup.get(key);
        control?.markAsTouched();
        if (control instanceof FormGroup) {
          markAllAsTouched(control);
        }
    });
}