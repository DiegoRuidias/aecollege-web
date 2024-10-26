import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { catchError, tap, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(MessageService);
  return next(req).pipe(
    tap({
      error: (e) => {
        console.log('Error...', e);
        
        if (e.error.messages) {
          const arrayErrors: Array<any> = e.error.messages;
          if (arrayErrors.length > 1) {
            let errorMessage = "<ul>";
            arrayErrors.forEach(item => {
              errorMessage = errorMessage + "<li>" + item.message + "</li>";
            });
            errorMessage = errorMessage + "</ul>";
            toastService.add({ severity: 'error', life: 10000, summary: 'Ha ocurrido los siguientes errores', detail: errorMessage });
          } else {
            toastService.add({ severity: 'error', life: 10000, summary: 'Ha ocurrido el siguiente error', detail: e.error.messages[0].message });
          }
        } else {
          toastService.add({ severity: 'error', life: 10000, summary: 'Ha ocurrido el siguiente error', detail: 'El Servidor no esta disponible en este momento, intentelo más tarde'});
        }
        
        /*switch (e.error.status) {
          case 400: {
            const arrayErrors: Array<any> = e.error.messages;
            if (arrayErrors.length > 1) {
              let errorMessage = "<ul>";
              arrayErrors.forEach(item => {
                errorMessage = errorMessage + "<li>" + item.message + "</li>";
              });
              errorMessage = errorMessage + "</ul>";
              toastService.add({ severity: 'error', life: 10000, summary: 'Ha ocurrido los siguientes errores', detail: errorMessage, icon: 'pi-close' });
            } else {
              toastService.add({ severity: 'error', summary: 'Error', detail: e.error.messages[0] });
            }
            break;
          }
          case 500: {
            console.log('default');
            break;
          }
          default: {
            console.log('default');
            break;
          }
        }*/
      }
    })
  );
  
};
/*
function handleErrorResponse(toastService: MessageService,error: HttpErrorResponse) {
  console.log('error rest: ', error);
  this.toastService.add({})
  return throwError(() => 'ERROR...');
}
*/