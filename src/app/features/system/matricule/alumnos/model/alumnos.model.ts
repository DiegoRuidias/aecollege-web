interface Option {
    id: number;
    name: string;
}

export const typeParent: Option[] = [
    { id: 1, name: "PADRE" },
    { id: 2, name: "MADRE" },
    { id: 3, name: "OTRO" }
];

export const typeMatricule: Option[] = [
    { id: 0, name: "Alumno nuevo" },
    { id: 1, name: "Rematricula" }
];

export const halfPayments: Option[] = [
    { id: 0, name: "Yape" },
    { id: 1, name: "Banco de la Nación" },
    { id: 2, name: "Banco de Crédito" },
    { id: 3, name: "Efectivo" }
];


