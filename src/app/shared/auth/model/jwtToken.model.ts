import { Message } from "primeng/api";

export interface JwtToken {
    expiresAt: string; 
    token: string;
  }
export const expiredSessionMessage: Message[] = [{
    id:1,
    severity: "error",
    summary: "Su sesión ha expirado, vuelva a ingresar",
  }];

export const noLogout: Message[] = [{
    id:1,
    severity: "error",
    summary: "Credenciales inválidas",
  }];