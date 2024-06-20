import { Component, OnInit } from '@angular/core';
import { VendaCidade } from '../../relatorios/model/venda-cidade';
import { GraficoVendaService } from '../../services/graficoVenda.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    vendaCidadeLista: VendaCidade[] = [];
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
          labels: [],
          datasets: [
                {
                    label: 'Mouse',
                    backgroundColor: documentStyle.getPropertyValue('--red-700'),
                    borderColor: documentStyle.getPropertyValue('--red-700'),
                    dataM: []
                },
                {
                    label: 'Teclado',
                    backgroundColor: documentStyle.getPropertyValue('--blue-700'),
                    borderColor: documentStyle.getPropertyValue('--blue-700'),
                    dataT: []
                }
            ]
        };

        this.options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                },
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
                            
                            size: 15
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

        this.serviceCidadeVenda.listar().subscribe( resposta => { this.vendaCidadeLista = resposta;
            
            this.data.labels = [...new Set(this.vendaCidadeLista.map(item => item.cidade))]; 
            this.data.datasets[0].data = this.vendaCidadeLista.filter(item => item.produto === 'Mouse').map(item => item.valor);
            this.data.datasets[1].data = this.vendaCidadeLista.filter(item => item.produto === 'Teclado').map(item => item.valor);
                
            this.data = { ...this.data };
           
        });
    }
}
