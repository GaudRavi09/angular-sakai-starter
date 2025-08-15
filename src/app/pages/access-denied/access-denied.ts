import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-access-denied',
  styleUrl: './access-denied.scss',
  templateUrl: './access-denied.html',
  imports: [ButtonModule, RouterModule]
})
export class AccessDenied {}
