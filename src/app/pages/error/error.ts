import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-error',
  styleUrl: './error.scss',
  templateUrl: './error.html',
  imports: [ButtonModule, RouterModule]
})
export class Error {}
