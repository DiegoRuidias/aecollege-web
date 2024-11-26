import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',  // Selector de la directiva
  standalone: true
})
export class UppercaseDirective {

  constructor(
    private el: ElementRef,
    @Optional() @Self() private control: NgControl  // Inyectamos el control del formulario reactivo
  ) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    const uppercaseValue = input.value.toUpperCase();  // Convertimos a mayúsculas

    // Si existe un FormControl, actualizamos su valor
    if (this.control) {
      this.control.control?.setValue(uppercaseValue, { emitEvent: false });  // Sin emitir eventos para evitar ciclos
    }

    // También actualizamos el valor en el DOM
    input.value = uppercaseValue;
  }
}

