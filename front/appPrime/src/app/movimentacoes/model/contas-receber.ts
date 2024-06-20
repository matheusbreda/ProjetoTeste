import { Venda } from "./venda";

export class ContasReceber{
    id: number;
    venda: Venda = new Venda();
    dataVencimneto: string;
    nrParcela: number;
    dataPagamento: string;
    valorParcela: number;
    valorMulta: number;
    valorJuros: number;
    valorPago: number;
    quantidade: number;
}
