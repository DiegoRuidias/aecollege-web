import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarLabel',
  standalone: true
})
export class AvatarLabelPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return ''; 
    
    const words = value.split(' '); 
    
    if (words.length < 2) {
      return ''; 
    }
    
    const firstLetters = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    
    return firstLetters;
  }

}
