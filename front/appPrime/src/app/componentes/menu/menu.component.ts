import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [ConfirmationService]
})
export class MenuComponent implements OnInit {
  items: MenuItem[];

  constructor( 
    private router: Router,
    private confirmaLogout: ConfirmationService,
  ){}

  ngOnInit() {
      this.items = [
          {
              label: 'Cadastro',
              icon: 'pi pi-pencil',
              expanded: true,
              items: [
                  {
                    label: 'Cidades',
                    icon: 'pi pi-map-marker',
                    routerLink: '/cidade'
                  },
                  {
                    label: 'Clientes',
                    icon: 'pi pi-user',
                    routerLink: '/cliente'
                  },
                  {
                    label: 'Fornecedores',
                    icon: 'pi pi-truck',
                    routerLink: '/fornecedor'
                  },
                  {
                    label: 'Produtos',
                    icon: 'pi pi-box',
                    routerLink: '/produto'
                  },
                  {
                    label: 'Tabela de preço',
                    icon: 'pi pi-dollar',
                    routerLink: '/tabela-preco'
                  }
              ]
          },
          {
              label: 'Movimentação',
              icon: 'pi pi-arrow-right-arrow-left',
              expanded: true,
              items: [
                  {
                      label: 'Venda',
                      icon: 'pi pi-cart-plus',
                      routerLink: '/venda'
                  }, 
              ]
          },
          {
              label: 'Relatórios',
              icon: 'pi pi-chart-bar',
              expanded: true,
              items: [
                  
              ]
          }
      ]
  }

  logout(event: Event) {
    this.confirmaLogout.confirm({
        target: event.target as EventTarget,
        message: 'Você deseja finalizar esta sessão?',
        header: 'Confirmação de saída',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptLabel:"Sim",
        rejectLabel:"Não",
        accept: () => {
          localStorage.removeItem('login');
          this.router.navigate(['/login']);
        },
    });
  }

}
