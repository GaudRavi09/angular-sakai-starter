import { Component } from '@angular/core';
import { AppMenu } from '@/layout/menu/menu';

@Component({
  imports: [AppMenu],
  selector: 'app-side-bar',
  styleUrl: './side-bar.scss',
  templateUrl: './side-bar.html'
})
export class SideBar {}
