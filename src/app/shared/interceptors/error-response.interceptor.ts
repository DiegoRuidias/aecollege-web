import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { tap} from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../auth/services/login.service';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(MessageService);
  const router = inject(Router);
  const loginService = inject(LoginService);
  return next(req).pipe(
    tap({
      error: (e) => {        
        switch (e.status) {
          case 401: {
            toastService.add({ severity: 'error', life: 10000, summary: 'Fallo en la autenticación', detail: e.error.message });
            loginService.logout();
            break;
          }
          case 500: {
            toastService.add({ severity: 'error', life: 10000, summary: 'Fallo en la autenticación', detail: e.error.message });
            break;
          }
          case 403: {
            console.log(e)
            toastService.add({ severity: 'error', life: 10000, summary: 'Fallo en la autenticación', detail: "No hay permisos suficientes" });
            const token = loginService.getToken();

            if (token && token.split('.').length === 3) {
                const payloadBase64 = token.split('.')[1];
                const decodedPayload = atob(payloadBase64);
                const payload = JSON.parse(decodedPayload);
        
                // Verifica si el token está expirado
                const isExpired = Date.now() >= payload.exp * 1000;
                if (isExpired) {
                    loginService.logout(); // Si el token ha expirado, cierra la sesión
                    break;
                }
            } else {
                console.error('Token no disponible, nulo o con formato incorrecto.');
                loginService.logout(); // Opcional: Cerrar sesión si no hay token o si el formato es incorrecto
                break;
            }
            break;
          }
          default: {
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
            break;
          }
        }
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