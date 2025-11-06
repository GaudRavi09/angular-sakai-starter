import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
@Component({
  selector: 'app-access-denied',
  styleUrl: './access-denied.scss',
  templateUrl: './access-denied.html',
  imports: [IonContent, ButtonModule, RouterModule]
})
export class AccessDenied {}
