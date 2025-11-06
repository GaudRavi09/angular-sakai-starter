import { addIcons } from 'ionicons';
import { Toast } from 'primeng/toast';
import * as icons from 'ionicons/icons';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Toast, RouterModule],
  template: `
    <!-- dynimic routes -->
    <router-outlet />

    <!-- toast -->
    <p-toast />
  `
})
export class AppComponent {
  constructor() {
    addIcons(icons);
  }
}
