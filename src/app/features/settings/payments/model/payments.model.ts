import { Period } from "../../periods/model/periods.model"

export interface Payments {
    id: number
    name: string
    isUnique: boolean
    day: number
    monthStart: number
    monthEnd: number
    createdAt: string
    updatedAt: any
    period: Period
    type: number
    amount: number 
}

interface Option {
    id: number;
    name: string;
}

export const typePayment: Option[] = [
    { id: 0, name: "MATRÍCULA" },
    { id: 1, name: "PENSIÓN" },
    { id: 2, name: "OTRO"}
];

export const months: any[] = [
    {id: 1 , month: "enero".toUpperCase()},
    {id: 2 , month: "febrero".toUpperCase()},
    {id: 3 , month: "marzo".toUpperCase()},
    {id: 4 , month: "abril".toUpperCase()},
    {id: 5 , month: "mayo".toUpperCase()},
    {id: 6 , month: "junio".toUpperCase()},
    {id: 7 , month: "julio".toUpperCase()},
    {id: 8 , month: "agosto".toUpperCase()},
    {id: 9, month: "septiembre".toUpperCase()},
    {id: 10, month: "octubre".toUpperCase()},
    {id: 11, month: "noviembre".toUpperCase()},
    {id: 12, month: "diciembre".toUpperCase()}
];