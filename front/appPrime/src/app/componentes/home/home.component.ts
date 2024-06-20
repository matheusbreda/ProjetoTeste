import { Component, OnInit } from '@angular/core';
import { VendaCidade } from '../../relatorios/model/venda-cidade';
import { Cliente } from '../../cadastros/model/cliente';
import { GraficoVendaService } from '../../services/graficoVenda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    vendaCidadeLista: VendaCidade[] = [];
    vendaCidade: VendaCidade[];
    data: any;
    options: any;

    constructor( 
        private serviceCidadeVenda: GraficoVendaService
      ){}

    ngOnInit() {

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color-black');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-black');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.data = {
          labels: [this.vendaCidadeLista],

          datasets: [
                {
                  label: 'Venda',
                  backgroundColor: documentStyle.getPropertyValue('--red-700'),
                  borderColor: documentStyle.getPropertyValue('--red-700'),
                  data: [this.vendaCidade]
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }

            }
        };

        this.serviceCidadeVenda.listar().subscribe( resposta => this.vendaCidadeLista = resposta);
        this.serviceCidadeVenda.listar().subscribe( resposta => this.vendaCidade = resposta);
    }
}
