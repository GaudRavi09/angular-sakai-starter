import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AppMenuItem } from '../menu-item/menu-item';

@Component({
  selector: 'app-menu',
  styleUrl: './menu.scss',
  templateUrl: './menu.html',
  imports: [AppMenuItem, RouterModule]
})
export class AppMenu implements OnInit {
  menus: MenuItem[] = [];

  ngOnInit() {
    this.menus = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/users'] }
        ]
      },
      {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        routerLink: ['/pages'],
        items: [
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/login']
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/error']
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/access-denied']
              }
            ]
          },
          {
            label: 'Not Found',
            icon: 'pi pi-fw pi-exclamation-circle',
            routerLink: ['/not-found']
          }
        ]
      }
    ];
  }
}
