
import { Produto } from "../../cadastros/model/produto";
import { Venda } from "./venda";

export class VendaItens{
    id: number;
    valorUnitario: number;
    valorTotal: number;
    quantidade: number;
    produto: Produto = new Produto();
    venda: Venda = new Venda();
}

