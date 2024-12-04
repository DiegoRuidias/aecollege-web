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