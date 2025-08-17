import { Toast } from 'primeng/toast';
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
export class AppComponent {}
