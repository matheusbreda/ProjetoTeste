import { Cliente } from "../../cadastros/model/cliente";
import { VendaItens } from "./venda-itens";

export class Venda{
    id: string;
    valorTotal: number;
    data: string; 
    cliente: Cliente = new Cliente();   
    itens: VendaItens[] = [];
}
    