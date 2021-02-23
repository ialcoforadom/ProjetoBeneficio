import { Orgao } from "./Orgao";

export interface Servidor {
    id: number;
    nome: string;
    cpf: string;
    matricula: number;
    dataCriacao: Date;
    telefone: string;
    email: string;
    beneficioId: number;
    orgaos: Orgao[];
}
