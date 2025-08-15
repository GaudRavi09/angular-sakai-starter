import { NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component, inject } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/services/layout.service';

@Component({
  selector: 'app-top-bar',
  styleUrl: './top-bar.scss',
  templateUrl: './top-bar.html',
  imports: [NgClass, RouterModule, StyleClassModule]
})
export class TopBar {
  layoutService = inject(LayoutService);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
