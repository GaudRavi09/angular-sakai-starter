import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-error',
  styleUrl: './error.scss',
  templateUrl: './error.html',
  imports: [IonContent, ButtonModule, RouterModule]
})
export class Error {}
