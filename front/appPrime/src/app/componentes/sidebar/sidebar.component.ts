import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor( 
    private router: Router,
    private confirmationService: ConfirmationService, 
  ){}

  logout(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Você deseja finalizar esta sessão?',
        header: 'Confirmação de saída',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",
        accept: () => {
          localStorage.removeItem('login');
          this.router.navigate(['/login']);
        },
    });
  }

}
