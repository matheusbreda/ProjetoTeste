import { Cidade } from "./cidade";

export class Fornecedor{
    id: number;
    nome: string;
    endereco: string;
    cnpj: string;
    cidade: Cidade = new Cidade();    
}
    