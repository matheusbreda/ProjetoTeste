import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

  items: MenuItem[] | undefined 

  constructor(){}

  ngOnInit() {
    this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            routerLink: '/home'
            
        },
        {
            label: 'Contact',
            icon: 'pi pi-envelope',
        }
    ];
  }

}