import { Cidade } from "./cidade";

export class Cliente{
    id: string;
    nome: string;
    endereco: string;
    cpf: string;
    cidade: Cidade = new Cidade();    
  }
    