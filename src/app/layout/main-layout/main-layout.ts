import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonTabs, IonIcon, IonLabel, IonTabBar, IonTabButton, IonRouterLink } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  styleUrl: './main-layout.scss',
  templateUrl: './main-layout.html',
  imports: [IonTabs, IonIcon, IonLabel, IonTabBar, IonTabButton, IonRouterLink, RouterLink]
})
export class MainLayout {}
