import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Component, ViewChild } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserList } from './components/user-list/user-list';

@Component({
  selector: 'app-users',
  styleUrl: './users.scss',
  templateUrl: './users.html',
  imports: [UserList, ButtonModule, ToolbarModule, ConfirmDialogModule]
})
export class Users {
  // input, output and  viewchild
  @ViewChild(UserList) userList!: UserList;

  exportCSV() {
    if (this.userList) {
      this.userList.exportCSV();
    }
  }
}
