interface Option {
    id: number;
    name: string;
}

export const state: Option[] = [
    { id: 0, name: "PENDIENTE" },
    { id: 1, name: "MATRICULADO" },
    { id: 2, name: "FINALIZADO" },
    { id: 3, name: "RETIRADO" }
];