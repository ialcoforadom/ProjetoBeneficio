import { Categoria } from "./Categoria";
import { Servidor } from "./Servidor";
import { Setor } from "./Setor";

export class Beneficio {
    constructor() {}

    id!: number;
    nome!: string;
    dataCriacao!: Date;
    categorias!: Categoria[];
    setores!: Setor[];
    servidores!: Servidor[];
    imagemUrl!: string;
}
